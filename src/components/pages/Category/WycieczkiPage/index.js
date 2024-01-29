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
import useStyles from "../styles";

const WycieczkiPageComponent = () => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const postsPerPage = 9;

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // ...

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Получаем все категории (categories)
                const categoriesResponse = await axios.get(`https://turystykabezfiltrow.com/wp-json/wp/v2/categories?per_page=100`);

                // Ищем категорию 'wycieczki'
                const wycieczkiCategory = categoriesResponse.data.find(category => category.name.toLowerCase() === 'wycieczki');

                if (!wycieczkiCategory) {
                    console.error('Category not found');
                    return;
                }

                // Получаем все посты с выбранной категорией 'wycieczki'
                const response = await axios.get(`https://turystykabezfiltrow.com/wp-json/wp/v2/posts?categories=${wycieczkiCategory.id}&per_page=${postsPerPage}&page=${page}&_embed`);

                const categoriesData = response.data.map(post => {
                    const imageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                    return {
                        postTitle: post.title.rendered,
                        lastPostImage: imageUrl,
                        postDescription: post.excerpt.rendered,
                        postDate: post.date,
                    };
                });
                setCategoriesData(categoriesData);

                const totalPagesHeader = response.headers['x-wp-totalpages'];
                setTotalPages(parseInt(totalPagesHeader) || 1);
            } catch (error) {
                console.error('Error fetching categories data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData().then(() => console.log('Categories data fetched'));
    }, [location.pathname, location.search, page]);

    const handleChangePage = (event, newPage) => {
        console.log('New Page:', newPage);
        setPage(newPage);
        navigate(`${location.pathname}?page=${newPage}`);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    return (
        <SectionWrapper id="actual" paddingBottom="100px" paddingTop="120px">
            <BreadCrumbs/>
            <Typography variant="h1" className={classes.title}>
                WEŹ UDZIAŁ
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
                                    <Box>
                                        <H4 className={classes.h4}>{post.postTitle}</H4>
                                    </Box>
                                    <Box className={classes.description}>
                                        <Typography variant="body2" className={classes.postDescription}
                                                    dangerouslySetInnerHTML={{__html: post.postDescription}}/>
                                    </Box>
                                </Box>
                                <Box>
                                    <Typography variant="body2" className={classes.date}>
                                        {new Date(post?.postDate).toLocaleDateString('pl-PL', {
                                            month: 'long',
                                            day: 'numeric',
                                            year: 'numeric'
                                        })}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
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

export default WycieczkiPageComponent;