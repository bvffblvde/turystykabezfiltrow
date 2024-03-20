import React, {useEffect, useState} from "react";
import axios from "axios";
import useStyles from "./styles";
import {useTheme} from "../../../theme/themeContext";
import {themes} from "../../../theme/themeContext/themes";
import {Box, Grid, Typography} from "@material-ui/core";
import H4 from "../H4";
import DownloadButton from "../DownloadButton";

const PublicationCard = ({post, mediaData}) => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);
    const featuredMediaId = post.featured_media;
    const media = featuredMediaId ? mediaData[featuredMediaId] : null;

    const extractFileUrls = (content) => {
        const fileUrlsSet = new Set();
        const regex = /<a[^>]+href="([^">]+)"[^>]*>(.*?)<\/a>/g;

        let match;
        while ((match = regex.exec(content)) !== null) {
            const url = match[1];

            // Проверяем, является ли URL файловым и оканчивается на ".pdf"
            const isFileUrl = !url.startsWith('mailto:') && url.toLowerCase().endsWith('.pdf');

            // Если это файловый URL и его еще нет в Set, добавляем его
            if (isFileUrl && !fileUrlsSet.has(url)) {
                fileUrlsSet.add(url);
            }
        }

        // Преобразуем Set обратно в массив
        return [...fileUrlsSet];
    };

    const filteredFileUrls = extractFileUrls(post?.content?.rendered || '');

    const descriptionWithoutImagesAndFiles = filteredFileUrls.reduce((content, fileUrl) => {
        // eslint-disable-next-line no-useless-escape
        const fileRegex = new RegExp(`<a[^>]+href="${fileUrl}"[^>]*>.*?<\/a>`, 'g');
        const imageRegex = /<img[^>]+src="([^">]+)"[^>]*>/g;

        // Удаляем файловые ссылки
        const contentWithoutFiles = content.replace(fileRegex, '');

        // Удаляем изображения
        return contentWithoutFiles.replace(imageRegex, '');
    }, post?.content?.rendered || '');

    return (
        <Box className={classes.root}>
            <H4 className={classes.mainTitle}>{post.title.rendered}</H4>

            {media && (
                <Box className={classes.imageContainer}>
                    <img src={media.source_url} alt={post.title.rendered} className={classes.image} loading="lazy"/>
                </Box>
            )}
            <Box className={classes.textContainer}>
                <Typography variant="body2" className={classes.content}
                            dangerouslySetInnerHTML={{__html: descriptionWithoutImagesAndFiles}}/>
            </Box>
            <Box>
                {filteredFileUrls.map((filteredFileUrl, index) => {
                    console.log('pdfUrl:', filteredFileUrl);
                    return <DownloadButton key={index} pdfUrl={filteredFileUrl}/>;
                })}
            </Box>
        </Box>
    );
};

const PublicationCards = ({postLimit}) => {
    const [postData, setPostData] = useState([]);
    const [mediaData, setMediaData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoriesResponse = await axios.get('https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/categories?per_page=100');
                const publikacjeCategory = categoriesResponse.data.find(category => category.name === 'Publikacje');

                if (!publikacjeCategory) {
                    console.error('Category not found');
                    return;
                }

                // Получаем посты с указанным тегом
                const response = await axios.get(`https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/posts?categories=${publikacjeCategory.id}`);
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
                <Grid item xs={12} sm={12} md={12} key={post.id}>
                    <PublicationCard post={post} mediaData={mediaData}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default PublicationCards;