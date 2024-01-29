import React, { useEffect, useState } from 'react';
import {
    Grid,
    makeStyles,
    Typography,
    Backdrop,
    CircularProgress,
    Box,
    Icon,
} from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import H4 from '../../../UI/H4';
import SectionWrapper from '../../../UI/SectionWrapper';
import { useTheme } from '../../../../theme/themeContext';
import { themes } from '../../../../theme/themeContext/themes';
import BreadCrumbs from '../../../UI/BreadCrumbs';
import DonatBadgeComponent from '../../../UI/DonatBadge';
import axios from 'axios';
import { ReactComponent as PostsCount } from '../../../../assets/Icons/posts-count-icon.svg';
import useStyles from '../styles';
import ContactForm from "../../../UI/ContactForm";

const RegionyPage = () => {
    const { theme } = useTheme();
    const classes = useStyles(themes[theme]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Запрос всех тегов
                const tagsResponse = await axios.get('https://turystykabezfiltrow.com/wp-json/wp/v2/tags?per_page=100');

                if (tagsResponse.data.length === 0) {
                    console.error('No tags found.');
                    return;
                }

                // Вывод информации о всех тегах
                const allTags = tagsResponse.data.map(tag => ({ name: tag.name, count: tag.count }));
                console.log('All tags:', allTags);

                // Фильтрация тегов "Niemcy" и "Ukraina"
                const niemcyTag = tagsResponse.data.find(tag => tag.slug.toLowerCase() === 'niemcy');
                const ukrainaTag = tagsResponse.data.find(tag => tag.slug.toLowerCase() === 'ukraina');

                if (!ukrainaTag) {
                    console.error('Tag "Ukraina" not found.');
                    return;
                }

                // Получение id тегов
                const ukrainaTagId = ukrainaTag.id;

                let niemcyTagId;

                // Если тег "Niemcy" найден, получите его id
                if (niemcyTag) {
                    niemcyTagId = niemcyTag.id;
                }

                // Запрос постов с указанными тегами
                const postsResponseUkraina = await axios.get(`https://turystykabezfiltrow.com/wp-json/wp/v2/posts?tags=${ukrainaTagId}&per_page=1&_embed`);
                const postsResponseNiemcy = niemcyTagId ? await axios.get(`https://turystykabezfiltrow.com/wp-json/wp/v2/posts?tags=${niemcyTagId}&per_page=1&_embed`) : null;

                const categoriesData = postsResponseUkraina.data.map(post => {
                    const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                    return {
                        tagName: ukrainaTag.name,
                        lastPostImage: imageUrl,
                        postCount: ukrainaTag.count,
                    };
                });

                if (postsResponseNiemcy) {
                    const niemcyPost = postsResponseNiemcy.data[0];
                    const imageUrl = niemcyPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                    categoriesData.push({
                        tagName: niemcyTag.name,
                        lastPostImage: imageUrl,
                        postCount: niemcyTag.count,
                    });
                }


                setCategoriesData(categoriesData);
            } catch (error) {
                console.error('Error fetching posts data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData().then(() => console.log('Posts data fetched'));
    }, [location.pathname]);


    return (
        <SectionWrapper id="kraje" paddingBottom="100px" paddingTop="120px">
            <BreadCrumbs />
            <Typography variant="h1" className={classes.title}>
                Kraje
            </Typography>
            <Grid container spacing={3} className={classes.cardWrapper}>
                {categoriesData.map((post, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Box className={classes.root}>
                            {post.lastPostImage && (
                                <div className={classes.imageContainer}>
                                    <img
                                        src={post.lastPostImage}
                                        alt={post.postTitle}
                                        className={classes.image}
                                        loading="lazy"
                                    />
                                </div>
                            )}
                            <Box className={classes.textContainer}>
                                <Box>
                                    <H4 className={classes.h4}>{post.tagName}</H4>
                                </Box>
                                <Box className={classes.countSection}>
                                    <Icon
                                        component={PostsCount}
                                        className={classes.icon}
                                        src={PostsCount}
                                    />
                                    <Typography variant="body2" className={classes.date}>
                                        {post.postCount}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <DonatBadgeComponent/>
            <ContactForm/>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </SectionWrapper>
    );
};

export default RegionyPage;
