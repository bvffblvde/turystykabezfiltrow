import React, {useEffect, useState} from 'react';
import {
    Grid,
    Typography,
    Backdrop,
    CircularProgress, Box, Icon,
} from '@material-ui/core';
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
import {Link as RouterLink} from 'react-router-dom';


// ... (ваш импорт)

const RegionyPage = () => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const regionImages = {
        WŁOCŁAWEK: 'https://i.ibb.co/TrqCf9j/w-ocwa-ek.png',
        INOWROCŁAW: 'https://i.ibb.co/0hxZ4M0/inowroc-aw.png',
        KRAKÓW: 'https://i.ibb.co/bsF0h2T/krako-w.png',
        SZCZECIN: 'https://i.ibb.co/XxfgQCW/szczecin.png',
        GRUDZIĄDZ: 'https://i.ibb.co/mqzn8H7/grudzia-dz.png',
        CHOJNICEIOKOLICE: 'https://i.ibb.co/HhcRWvZ/chojnice.png',
        GÓRYSOWIE: 'https://i.ibb.co/ZmSN2f2/go-ry-sowie.png'
        // Добавьте другие регионы и соответствующие URL изображений
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const tagsResponse = await axios.get('https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/tags?per_page=100');

                if (tagsResponse.data.length === 0) {
                    console.error('No tags found.');
                    return;
                }

                const filteredTags = tagsResponse.data.filter(tag =>
                    regionImages.hasOwnProperty(tag.name.toUpperCase())
                );

                const tagRequests = filteredTags.map(async regionyTag => {
                    const tag = tagsResponse.data.find(tag => tag.name.toLowerCase() === regionyTag.name.toLowerCase());
                    const postsResponse = await axios.get(`https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/posts?tags=${tag.id}&per_page=1&_embed`);
                    const post = postsResponse.data[0];

                    if (post) {
                        const imageUrl = regionImages[regionyTag.name.toUpperCase()];
                        return {
                            postTitle: tag.name,
                            lastPostImage: imageUrl,
                            postCount: tag.count,
                            tagSlug: tag.slug,
                        };
                    } else {
                        return null;
                    }
                });

                const categoriesData = (await Promise.all(tagRequests)).filter(post => post !== null);
                setCategoriesData(categoriesData);

                console.log('Fetched data for regionyTags:', categoriesData);
            } catch (error) {
                console.error('Error fetching posts data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData().then(() => console.log('Posts data fetched'));
    }, []);

    const formatTagName = (postTitle) => {
        // Assuming tagName is in CamelCase format
        // You can use a regular expression to insert spaces before capital letters
        return postTitle.replace(/([A-Z])/g, ' $1').trim();
    };


    return (
        <SectionWrapper id="kraje" paddingBottom="100px" paddingTop="120px">
            <BreadCrumbs/>
            <Typography variant="h1" className={classes.title}>
                Regiony
            </Typography>
            <Grid container spacing={3} className={classes.cardWrapper}>
                {categoriesData.map((post, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <RouterLink to={`/regiony/${post.tagSlug}`} className={classes.linkWrapper}>
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
                                        <H4 className={classes.h4}>{formatTagName(post.postTitle)}</H4>
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
                        </RouterLink>
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
