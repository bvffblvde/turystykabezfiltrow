import React, {useEffect, useState} from 'react';
import {
    Typography,
    Box,
    Button,
    makeStyles,
    Grid, CircularProgress, Backdrop,
} from '@material-ui/core';
import SectionWrapper from '../../UI/SectionWrapper';
import {useTheme} from '../../../theme/themeContext';
import {themes} from '../../../theme/themeContext/themes';
import BreadCrumbs from '../../UI/BreadCrumbs';
import ContactForm from '../../UI/ContactForm';
import DonatBadgeComponent from '../../UI/DonatBadge';
import ShareButton from '../../UI/ShareButton';
import axios from 'axios';
import StyledButton from "../../UI/StyledButton";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '80px',
        marginBottom: '80px',
        [theme.breakpoints.down('sm')]: {
            gap: '40px',
            marginBottom: '40px',
        }
    },
    title: {
        fontFamily: 'Inter-Regular',
        fontSize: '36px',
        fontWeight: '500',
        color: ({textColor}) => textColor,
        textAlign: 'left',
        marginBottom: '12px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
            marginBottom: '20px',
        },
    },
    videoContainer: {
        width: '100%',
        maxWidth: '80vw',
        margin: 'auto',
        [theme.breakpoints.down('sm')]: {
            maxWidth: '100%',
        }
        //marginBottom: '20px',
    },
    videoFrameWrapper: {

        '& iframe': {
            width: '100%',
            height: '70vh',
            marginBottom: '32px',
            borderRadius: '16px', // Пример радиуса скругления углов
            boxShadow: 'none', // Пример тени
            [theme.breakpoints.down('sm')]: {
                marginBottom: '16px',
                height: '40vh',
            }

        },

        '& figure': {
            margin: '0',
        }
    },
    titleSection: {
        fontFamily: 'Inter-Bold',
        fontSize: '60px',
        fontWeight: '500',
        color: ({textColor}) => textColor,
        textAlign: 'center',
        marginBottom: '32px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
            marginBottom: '20px',
        }
    },

    shareTitleSection: {
        display: 'flex',
        gap: '20px',
        flexDirection: 'row',
    },

    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },

    buttonWrapper: {
        width: '25%',
        margin: '0 auto',
        marginBottom: '80px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    }
}));

const FilmyPage = () => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);
    const [videoPosts, setVideoPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const handleLoadMore = async () => {
        setLoading(true);
        try {
            const tagsResponse = await axios.get('https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/tags?per_page=100');

            if (tagsResponse.data.length === 0) {
                console.error('No tags found.');
                return;
            }

            const filmyTag = tagsResponse.data.find(tag => tag.name.toLowerCase() === 'filmy');

            if (!filmyTag) {
                console.error('Tag "filmy" not found.');
                return;
            }

            const postsResponse = await axios.get(`https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/posts?tags=${filmyTag.id}&per_page=10&page=${page}&_embed`);

            if (postsResponse.data.length === 0) {
                console.error('No more posts found with the "filmy" tag.');
                return;
            }

            const formattedPosts = postsResponse.data.map(post => {
                const videoUrl = extractVideoUrl(post.content.rendered);
                return {
                    postTitle: post.title.rendered,
                    postContent: post.content.rendered,
                    videoUrl: videoUrl,
                };
            });

            setVideoPosts(prevPosts => [...prevPosts, ...formattedPosts]);
            setPage(prevPage => prevPage + 1);
        } catch (error) {
            console.error('Error fetching posts data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        handleLoadMore();
    }, []);

    // Функция для извлечения URL видео из контента поста
    const extractVideoUrl = (content) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const videoElement = doc.querySelector('iframe'); // Предполагается, что видео находится внутри тега <iframe>
        if (videoElement) {
            return videoElement.getAttribute('src');
        }
        return null;
    };

    return (
        <SectionWrapper id="Filmy" paddingBottom="100px" paddingTop="120px">
            <BreadCrumbs />
            <Typography variant="h1" className={classes.titleSection}>
                Filmy
            </Typography>
            <Box className={classes.root}>
                {videoPosts.map((post, index) => (
                    <Box key={index} className={classes.videoContainer}>
                        <Typography variant="h2" className={classes.videoFrameWrapper} dangerouslySetInnerHTML={{__html: post.postContent}} />
                        <Box className={classes.shareTitleSection}>
                            <ShareButton url={post.videoUrl} />
                            <Typography variant="h2" className={classes.title} dangerouslySetInnerHTML={{__html: post.postTitle}} />
                        </Box>
                    </Box>
                ))}
            </Box>
            <Box className={classes.buttonWrapper}>
                {/* Используйте вашу кнопку "Загрузить еще" */}
                <StyledButton text="Załaduj więcej" clicked={handleLoadMore} width="100%" />
            </Box>
            <DonatBadgeComponent />
            <ContactForm />
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </SectionWrapper>
    );
};

export default FilmyPage;
