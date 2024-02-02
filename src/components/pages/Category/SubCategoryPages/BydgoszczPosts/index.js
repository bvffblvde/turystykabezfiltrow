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

const BydgoszczPostsPage = () => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const postsPerPage = 9;
    const {categorySlug} = useParams(); // Извлекаем categorySlug из URL
    const [currentCategorySlug, setCurrentCategorySlug] = useState(null);
    const [currentCategoryName, setCurrentCategoryName] = useState('');

    const [loadingCategory, setLoadingCategory] = useState(false);
    const [loadingPosts, setLoadingPosts] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            setLoadingCategory(true);
            try {
                const response = await fetch(
                    `https://turystykabezfiltrow.com/wp-json/wp/v2/categories?slug=${categorySlug}`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch category data');
                }

                const categoryData = await response.json();

                if (categoryData.length > 0) {
                    const categoryId = categoryData[0].id;
                    setCurrentCategorySlug(categoryId);
                    setCurrentCategoryName(categoryData[0].name);
                } else {
                    console.error('Category not found.');
                }
            } catch (error) {
                console.error('Error fetching category data:', error);
            } finally {
                setLoadingCategory(false);
            }
        };

        if (categorySlug) {
            fetchData();
        }
    }, [categorySlug]);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingPosts(true);
            try {
                const response = await fetch(
                    `https://turystykabezfiltrow.com/wp-json/wp/v2/posts?_embed&per_page=${postsPerPage}&page=${page}&categories=${currentCategorySlug}`
                );

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setPosts(data);
                const totalPagesHeader = response.headers.get('X-WP-TotalPages');
                setTotalPages(Number(totalPagesHeader));
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoadingPosts(false);
            }
        };

        if (currentCategorySlug) {
            fetchData();
        }
    }, [page, currentCategorySlug]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        // Обновляем URL с новым номером страницы
        navigate(`/bydgoszcz/${categorySlug}?page=${newPage}`);
        window.scrollTo({top: 0, behavior: 'smooth'});
    };

    return (
        <SectionWrapper id="actual" paddingBottom="100px" paddingTop="120px">
            <BreadCrumbs/>
            <Typography variant="h1" className={classes.title}>
                {currentCategoryName}
            </Typography>
            <Grid container spacing={3} className={classes.cardWrapper}>
                {posts.map((post, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Link to={`/bydgoszcz/${categorySlug}/${post.slug}`} className={classes.link}>
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
                                                dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}
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
            <Backdrop className={classes.backdrop} open={loadingCategory || loadingPosts}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </SectionWrapper>
    );
};

export default BydgoszczPostsPage;