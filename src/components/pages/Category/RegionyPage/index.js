import React, {useEffect, useState} from 'react';
import {
    Grid,
    makeStyles,
    Typography,
    Backdrop,
    CircularProgress, Box, Icon,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import {useNavigate, useLocation, Link} from 'react-router-dom';
import H4 from "../../../UI/H4";
import SectionWrapper from "../../../UI/SectionWrapper";
import {useTheme} from "../../../../theme/themeContext";
import {themes} from "../../../../theme/themeContext/themes";
import BreadCrumbs from "../../../UI/BreadCrumbs";
import ContactForm from "../../../UI/ContactForm";
import DonatBadgeComponent from "../../../UI/DonatBadge";
import axios from "axios";
import {ReactComponent as PostsCount} from "../../../../assets/Icons/posts-count-icon.svg";
import useStyles from "../styles";

const RegionyPage = () => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // ...

    const regionyTags = ['WŁOCŁAWEK', 'INOWROCŁAW', 'KRAKÓW', 'SZCZECIN', 'GRUDZIĄDZ', 'CHOJNICE I OKOLICE', 'GÓRY SOWIE'];

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

                // Фильтрация тегов из regionyTags
                const filteredTags = regionyTags.filter(regionyTag =>
                    tagsResponse.data.some(tag => tag.name.toLowerCase() === regionyTag.toLowerCase())
                );

                // Запрос постов для каждого тега из regionyTags
                // ...

// Запрос постов для каждого тега из regionyTags
                const tagRequests = filteredTags.map(async regionyTag => {
                    const tag = tagsResponse.data.find(tag => tag.name.toLowerCase() === regionyTag.toLowerCase());
                    const postsResponse = await axios.get(`https://turystykabezfiltrow.com/wp-json/wp/v2/posts?tags=${tag.id}&per_page=1&_embed`);
                    const post = postsResponse.data[0];

                    if (post) {
                        const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';
                        return {
                            postTitle: regionyTag,  // используем название тега
                            lastPostImage: imageUrl,
                            postCount: tag.count,
                        };
                    } else {
                        return null;
                    }
                });

                const categoriesData = (await Promise.all(tagRequests)).filter(post => post !== null);

                setCategoriesData(categoriesData);

                console.log('Fetched data for regionyTags:', categoriesData);

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
            <BreadCrumbs/>
            <Typography variant="h1" className={classes.title}>
                Regiony
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
                                    <H4 className={classes.h4}>{post.postTitle}</H4>
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