import {useTheme} from "../../../theme/themeContext";
import {themes} from "../../../theme/themeContext/themes";
import {Box, Grid, Typography} from "@material-ui/core";
import H4 from "../H4";
import React, {useEffect, useState} from "react";
import axios from "axios";
import useStyles from "./styles";
import {Link} from "react-router-dom";

const ProjectDetailsCard = ({post, mediaData}) => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);
    const featuredMediaId = post.featured_media;
    const media = featuredMediaId ? mediaData[featuredMediaId] : null;

    return (
        <>
            <Link to={`/projekty/${post.slug}`} className={classes.link}>
                <Box className={classes.root}>
                    {media && (
                        <Box className={classes.imageContainer}>
                            <img src={media.source_url} alt={post.title.rendered} className={classes.image}
                                 loading="lazy"/>
                        </Box>
                    )}
                    <Box className={classes.textContainer}>
                        <H4 className={classes.mainTitle}>{post.title.rendered}</H4>

                        <Typography variant="body2" className={classes.date}>
                            {new Date(post?.date).toLocaleDateString('pl-PL', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </Typography>
                    </Box>
                </Box>
            </Link>
        </>
    );
};

const ProjectPublicationCards = ({postLimit}) => {
    const [postData, setPostData] = useState([]);
    const [mediaData, setMediaData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await axios.get('https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/categories?per_page=100');
                console.log('Categories Response:', categoriesResponse.data);
                const projektyCategory = categoriesResponse.data.find(category => category.name.toLowerCase() === 'projekty');

                if (!projektyCategory) {
                    console.error('Category not found');
                    return;
                }

                // Получаем посты с указанным тегом
                const response = await axios.get(`https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/posts?categories=${projektyCategory.id}`);
                setPostData(response.data);

                // Получаем медиафайлы для каждого поста
                const mediaIds = response.data.map((post) => post.featured_media);
                const mediaPromises = mediaIds.map((mediaId) =>
                    axios.get(`https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/media/${mediaId}`)
                );

                const mediaResults = await Promise.all(mediaPromises);

                const mediaDataObject = mediaResults.reduce((acc, media) => {
                    acc[media.data.id] = media.data;
                    return acc;
                }, {});
                setMediaData(mediaDataObject);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData().then(r => console.log(r));
    }, [postLimit]);


    const classes = useStyles();

    return (
        <Grid container spacing={3} className={classes.cardWrapper}>
            {postData.map((post) => (
                <Grid item xs={6} sm={6} md={6} key={post.id}>
                    <ProjectDetailsCard post={post} mediaData={mediaData}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default ProjectPublicationCards;