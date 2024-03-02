import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Typography, Box, CircularProgress, Backdrop} from '@material-ui/core';
import SectionWrapper from '../../UI/SectionWrapper';
import {useTheme} from '../../../theme/themeContext';
import {themes} from '../../../theme/themeContext/themes';
import BreadCrumbs from '../../UI/BreadCrumbs';
import {fetchPostBySlug} from './apiRequests';
import useStyles from './styles';
import ShareButton from "../../UI/ShareButton";
import ProjectCard from "../../UI/ActualProjectsCard";
import Sidebar from "../../UI/SideBar";
import RichLink from "../../UI/RichLinks";
import {LinkPreview} from "@dhaiwat10/react-link-preview";
import {Helmet} from "react-helmet-async";
import DonatBadgeComponent from "../../UI/DonatBadge";
import StyledButton from "../../UI/StyledButton";
import CommentButton from "../../UI/CommentButton";

const PostDetails = () => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [comments, setComments] = useState([]);  // Добавление состояния для комментариев

    const {postSlug} = useParams();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            try {
                const dataPost = await fetchPostBySlug(postSlug);
                setPost(dataPost);

                // Запрос комментариев при получении данных поста
                const response = await fetch(`https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/comments?post=${dataPost?.id}`);
                const commentsData = await response.json();
                setComments(commentsData);
            } catch (error) {
                console.error('Error fetching post data:', error);
            } finally {
                setLoading(false);
            }
        };

        setSelectedImageIndex(0);
        fetchData().then(r => r);
    }, [postSlug]);

    const descriptionWithImages = post?.content?.rendered || '';

    return (
        <SectionWrapper paddingBottom="100px" paddingTop="120px">
            {/*<RichLink name={post?.title?.rendered} title={post?.title?.rendered} description={post?.content?.rendered}*/}
            {/*          image={post?._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].source_url}/>*/}
            <BreadCrumbs/>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <Box className={classes.contentWrapper}>
                <Box className={classes.textWrapper}>
                    <Box style={{borderBottom: '1px solid', borderColor: `${themes[theme].borderColor}`}}>
                        <Typography variant="h1" className={classes.title}
                                    dangerouslySetInnerHTML={{__html: post?.title?.rendered}}/>
                        <Typography variant="h1" className={classes.date}>
                            {new Date(post?.date).toLocaleDateString('pl-PL', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </Typography>
                        <ShareButton url={window.location.href}/>
                    </Box>
                    <Box className={classes.mainImageWrapper}>
                        {post?._embedded && post._embedded['wp:featuredmedia'] && (
                            <div>
                                <img
                                    src={post._embedded['wp:featuredmedia'][0].source_url}
                                    alt={post.title?.rendered}
                                    className={classes.image}
                                    loading="lazy"
                                />
                            </div>
                        )}
                    </Box>
                    <Box className={classes.textContainer}>
                        <Typography variant="body1" dangerouslySetInnerHTML={{__html: descriptionWithImages}}
                                    className={classes.description}/>
                    </Box>

                    {/* Отображение комментариев */}
                    {/*{comments.length > 0 && (*/}
                    {/*    <Box className={classes.commentsWrapper}>*/}
                    {/*        <Box className={classes.addCommentBoxWrapper}>*/}
                    {/*            <Typography variant="h2" className={classes.commentText}>*/}
                    {/*                Zostaw swoją opinię na temat tego artykułu*/}
                    {/*            </Typography>*/}
                    {/*            <StyledButton text="Napisz recenzję" width="30%"/>*/}
                    {/*        </Box>*/}
                    {/*        {comments.map(comment => (*/}
                    {/*            <div key={comment.id} className={classes.commentBoxWrapper}>*/}
                    {/*                <Box className={classes.userCommentDate}>*/}
                    {/*                    <Typography variant="body1" dangerouslySetInnerHTML={{__html: comment.author_name}} className={classes.authorName}/>*/}
                    {/*                    <Typography variant="h4" className={classes.date}>*/}
                    {/*                        {new Date(comment.date).toLocaleDateString('pl-PL', {*/}
                    {/*                            month: 'long',*/}
                    {/*                            day: 'numeric',*/}
                    {/*                            year: 'numeric'*/}
                    {/*                        })}*/}
                    {/*                    </Typography>*/}
                    {/*                </Box>*/}
                    {/*                <Typography variant="body1" dangerouslySetInnerHTML={{__html: comment.content.rendered}} className={classes.commentText}/>*/}
                    {/*                <CommentButton text="Odpowiedź"/>*/}
                    {/*            </div>*/}
                    {/*        ))}*/}
                    {/*    </Box>*/}
                    {/*)}*/}
                </Box>
                <Box className={classes.imageWrapper}>
                    <Sidebar>
                        <ProjectCard projectLimit={3} smallProjectView/>
                    </Sidebar>
                </Box>
            </Box>
            <DonatBadgeComponent />
        </SectionWrapper>
    );
};

export default PostDetails;
