import React, {useEffect, useState} from 'react';
import {
    Grid,
    Typography,
    Backdrop,
    CircularProgress, Box,
} from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import {useNavigate, useLocation, Link, useParams} from 'react-router-dom';
import H4 from "../../../../UI/H4";
import SectionWrapper from "../../../../UI/SectionWrapper";
import {useTheme} from "../../../../../theme/themeContext";
import BreadCrumbs from "../../../../UI/BreadCrumbs";
import ContactForm from "../../../../UI/ContactForm";
import DonatBadgeComponent from "../../../../UI/DonatBadge";
import useStyles from "../styles";
import {themes} from "../../../../../theme/themeContext/themes";
import axios from "axios";

const RegionyPostsPage = () => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const postsPerPage = 9;
    const {tagSlug} = useParams();
    const [currentTagSlug, setCurrentTagSlug] = useState(null);
    const [currentTagName, setCurrentTagName] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true); // Устанавливаем loading в true перед запросом данных
            try {
                // Fetch tag data
                const tagResponse = await axios.get(
                    `https://turystykabezfiltrow.com/wp-json/wp/v2/tags?slug=${tagSlug}`
                );

                if (!tagResponse || !tagResponse.data || tagResponse.data.length === 0) {
                    throw new Error('No tag data found');
                }

                const tagData = tagResponse.data[0];

                if (tagData) {
                    setCurrentTagSlug(tagData.id);
                    setCurrentTagName(tagData.name);

                    // Fetch posts data
                    const postsResponse = await axios.get(
                        `https://turystykabezfiltrow.com/wp-json/wp/v2/posts?_embed&per_page=${postsPerPage}&page=${page}&tags=${tagData.id}`
                    );

                    if (postsResponse.status !== 200) {
                        throw new Error('Failed to fetch posts data');
                    }

                    const data = postsResponse.data;
                    setPosts(data);
                    const totalPagesHeader = postsResponse.headers.get('X-WP-TotalPages');
                    setTotalPages(Number(totalPagesHeader));
                } else {
                    console.error('Tag not found.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                console.log('Response data:', error.response?.data);
            } finally {
                setLoading(false); // Устанавливаем loading в false после завершения запроса данных
            }
        };

        if (tagSlug) {
            fetchData();
        }
    }, [tagSlug, page]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        navigate(`/regiony/${tagSlug}?page=${newPage}`);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
        <SectionWrapper id="actual" paddingBottom="100px" paddingTop="120px">
            <BreadCrumbs/>
            <Typography variant="h1" className={classes.title}>
                {currentTagName}
            </Typography>
            <Grid container spacing={3} className={classes.cardWrapper}>
                {posts.map((post, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Link to={`/regiony/${tagSlug}/${post.slug}`} className={classes.link}>
                            <Box className={classes.root}>
                                {post._embedded && post._embedded['wp:featuredmedia'] && (
                                    <div className={classes.imageContainer}>
                                        <img
                                            src={post._embedded['wp:featuredmedia'][0].source_url}
                                            alt={post.title.rendered}
                                            className={classes.image}
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                                <Box className={classes.textContainer}>
                                    <Box>
                                        <Box>
                                            <H4 className={classes.h4}>{post.title.rendered}</H4>
                                        </Box>
                                        <Box className={classes.description}>
                                            <Typography
                                                variant="body2"
                                                className={classes.postDescription}
                                                dangerouslySetInnerHTML={{
                                                    __html: post.excerpt.rendered,
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" className={classes.date}>
                                            {new Date(post.date).toLocaleDateString('pl-PL', {
                                                month: 'long',
                                                day: 'numeric',
                                                year: 'numeric',
                                            })}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Link>
                    </Grid>
                ))}
            </Grid>
            <Pagination
                className={classes.pagination}
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                boundaryCount={window.innerWidth < 600 ? 1 : 2}
                shape="rounded"
            />
            <DonatBadgeComponent/>
            <ContactForm/>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </SectionWrapper>
    );
};

export default RegionyPostsPage;
