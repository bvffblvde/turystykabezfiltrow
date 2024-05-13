import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Box, Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import H4 from "../H4";
import {Link} from "react-router-dom";
import {useTheme} from "../../../theme/themeContext";
import {themes} from "../../../theme/themeContext/themes";
import CommentIcon from '../../../assets/Icons/comment-count.svg'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: ({backgroundColor}) => backgroundColor,
        color: ({textColor}) => textColor,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        cursor: 'pointer',
        padding: '10px 10px 20px 10px',
        boxShadow: '0px 0px 16px 0px #0000000f',
        transition: "all 0.5s ease-out",
        borderRadius: '16px',
        '&:hover': {
            transition: "all 0.5s ease-out",
            transform: 'scale(1.02)',
            // '& $image': {
            //     transition: "all 0.5s ease-out",
            //     transform: 'scale(1.05)',
            // },
        },
        '&:hover $mainTitle': {
            transition: "all 0.3s ease-out",
            color: ({postsHoverTextColor}) => postsHoverTextColor,
        },
    },
    textContainer: {
        flex: 1,
        //padding: '10px',
        //border: '1px solid',
        //borderColor: ({borderColor}) => borderColor,
    },
    image: {
        transition: "all 0.3s ease-out",
        width: '100%',
        height: '30vh',
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            height: '25vh',
        }
    },
    imageContainer: {
        display: 'flex',
        flex: '0 0 auto',
        overflow: 'hidden',
        marginBottom: '12px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '10px',
        }
    },
    date: {
        fontFamily: 'Inter-Regular',
        fontSize: '16px',
        fontWeight: '400',
        opacity: '0.6',
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px',
        }
    },
    //TODO: refactor
    cardWrapper: {
        marginBottom: '6px',
    },
    linkWrapper: {
        textDecoration: 'none',
        color: 'inherit', // Унаследовать цвет из родительского элемента
    },
    description: {
        fontFamily: 'Inter-Regular',
        fontSize: '16px',
        fontWeight: '400',
        lineClamp: 4,
        boxOrient: 'vertical',
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginBottom: '32px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
            marginBottom: '16px',
        }
    },
    mainTitle: {
        lineClamp: 2,
        boxOrient: 'vertical',
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
}));

const PostCard = ({post, mediaData, commentCount}) => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);
    const featuredMediaId = post.featured_media;
    const media = featuredMediaId ? mediaData[featuredMediaId] : null;

    return (
        <Link to={`/aktualnosci/${post.slug}`} className={classes.linkWrapper}>
            <Box className={classes.root}>
                {media && (
                    <Box className={classes.imageContainer}>
                        <img src={media.source_url} alt={post.title.rendered} className={classes.image} loading="lazy"/>
                    </Box>
                )}
                <Box className={classes.textContainer}>
                    <H4 className={classes.mainTitle}>{post.title.rendered}</H4>
                    <Typography variant="body2" className={classes.description}
                                dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}/>
                    <Box style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Box>
                            <Typography variant="body2" className={classes.date}>
                                {new Date(post?.date).toLocaleDateString('pl-PL', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </Typography>
                        </Box>
                        <Box style={{display: 'flex', flexDirection: 'row', gap: '5px'}}>
                            <img src={CommentIcon} alt="comment-icon" className={classes.icon}/>
                            <Typography variant="body2" className={classes.date}>
                                {`${commentCount}`}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Link>
    );
};

const PostsCard = ({random, postLimit}) => {
    const [postData, setPostData] = useState([]);
    const [mediaData, setMediaData] = useState({});
    const classes = useStyles();
    const [commentCounts, setCommentCounts] = useState({});


    useEffect(() => {
        const fetchData = async () => {
            try {
                // Получаем все посты
                const response = await axios.get('https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/posts', {
                    params: {
                        per_page: 10
                    }
                }); // Установите достаточно большой лимит, чтобы получить все посты

                let fetchedData = response.data;

                // Проверяем, нужно ли случайно перемешивать данные
                if (random) {
                    fetchedData = shuffleArray(fetchedData);
                }

                // Обрезаем массив до postLimit, если он задан
                if (postLimit) {
                    fetchedData = fetchedData.slice(0, postLimit);
                }

                setPostData(fetchedData);

                const mediaIds = fetchedData.map((post) => post.featured_media);
                const mediaPromises = mediaIds.map((mediaId) =>
                    axios.get(`https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/media/${mediaId}`)
                );

                const mediaResults = await Promise.all(mediaPromises);

                const mediaDataObject = mediaResults.reduce((acc, media) => {
                    acc[media.data.id] = media.data;
                    return acc;
                }, {});
                setMediaData(mediaDataObject);

                const commentIds = fetchedData.map((post) => post.id);
                const commentPromises = commentIds.map((postId) =>
                    axios.get(`https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/comments?post=${postId}`)
                );

                const commentResults = await Promise.all(commentPromises);

                const commentCountObject = commentResults.reduce((acc, comments, index) => {
                    acc[fetchedData[index].id] = comments.data.length;
                    return acc;
                }, {});
                setCommentCounts(commentCountObject);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [random, postLimit]);

    // Функция для случайного перемешивания массива
    const shuffleArray = (array) => {
        const shuffledArray = [...array];
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray;
    };

    return (
        <Grid container spacing={3} className={classes.cardWrapper}>
            {postData.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post.id}>
                    <PostCard
                        post={post}
                        mediaData={mediaData}
                        commentCount={commentCounts[post.id] || 0} // Установить количество комментариев или 0, если информация отсутствует
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default PostsCard;






