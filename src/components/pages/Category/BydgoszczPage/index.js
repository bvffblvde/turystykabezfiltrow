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

const BydgoszczPage = () => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [page, setPage] = useState(1);
    //const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    //const postsPerPage = 9;

    // const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // useEffect(() => {
    //     const params = new URLSearchParams(location.search);
    //     const newPage = parseInt(params.get('page')) || 1;
    //
    //     if (newPage !== page) {
    //         setPage(newPage);
    //     }
    // }, [location.search, page]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const bydgoszczCategoryIdResponse = await axios.get(`https://turystykabezfiltrow.com/wp-json/wp/v2/categories?slug=bydgoszcz`);

                if (bydgoszczCategoryIdResponse.data.length === 0) {
                    console.error('Category "bydgoszcz" not found.');
                    return;
                }

                const bydgoszczCategoryId = bydgoszczCategoryIdResponse.data[0].id;

                const subCategoriesResponse = await axios.get(`https://turystykabezfiltrow.com/wp-json/wp/v2/categories?parent=${bydgoszczCategoryId}&per_page=100`);

                const categoriesData = [];

                for (const category of subCategoriesResponse.data) {
                    const postsResponse = await axios.get(`https://turystykabezfiltrow.com/wp-json/wp/v2/posts?categories=${category.id}&per_page=1&_embed`);

                    if (postsResponse.data.length > 0) {
                        const imageUrl = postsResponse.data[0]._embedded?.['wp:featuredmedia']?.[0]?.source_url || '';

                        categoriesData.push({
                            categoryName: category.name,
                            lastPostImage: imageUrl,
                            postCount: category.count,
                        });
                    }
                }


                setCategoriesData(categoriesData);
            } catch (error) {
                console.error('Error fetching categories data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData().then(() => console.log('Categories data fetched'));
    }, [location.pathname, location.search, page]);


    // const handleChangePage = (event, newPage) => {
    //     navigate(`${location.pathname}?page=${newPage}`);
    //     window.scrollTo({ top: 0, behavior: 'smooth' });
    // };

    return (
        <SectionWrapper id="bydgoszcz" paddingBottom="100px" paddingTop="120px">
            <BreadCrumbs/>
            <Typography variant="h1" className={classes.title}>
                Bydgoszcz
            </Typography>
            <Grid container spacing={3} className={classes.cardWrapper}>
                {categoriesData.map((category, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Box className={classes.root}>
                            {category.lastPostImage && (
                                <div className={classes.imageContainer}>
                                    <img
                                        src={category.lastPostImage}
                                        alt={category.categoryName}
                                        className={classes.image}
                                        loading="lazy"
                                    />
                                </div>
                            )}
                            <Box className={classes.textContainer}>
                                <Box>
                                    <H4 className={classes.h4}>{category.categoryName}</H4>
                                </Box>
                                <Box className={classes.countSection}>
                                    <Icon
                                        component={PostsCount}
                                        className={classes.icon}
                                        src={PostsCount}
                                    />
                                    <Typography variant="body2" className={classes.date}>
                                        {`${category.postCount}`}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Grid>
                ))}
            </Grid>
            {/*<Pagination*/}
            {/*    className={classes.pagination}*/}
            {/*    count={totalPages}*/}
            {/*    page={page}*/}
            {/*    onChange={handleChangePage}*/}
            {/*    boundaryCount={window.innerWidth < 600 ? 1 : 2}*/}
            {/*    shape="rounded"*/}
            {/*/>*/}
            <DonatBadgeComponent/>
            <ContactForm/>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
        </SectionWrapper>
    );
};

export default BydgoszczPage;


