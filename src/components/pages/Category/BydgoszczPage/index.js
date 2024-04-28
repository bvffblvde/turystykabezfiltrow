import React, {useEffect, useState} from 'react';
import {
    Grid,
    Typography,
    Backdrop,
    CircularProgress, Box, Icon,
} from '@material-ui/core';
import {Link} from 'react-router-dom';
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
import ReactGA from "react-ga";

const BydgoszczPage = () => {
    const { theme } = useTheme();
    const classes = useStyles(themes[theme]);
    const [categoriesData, setCategoriesData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true); // Установка состояния загрузки в true перед запросом
                const bydgoszczCategoryIdResponse = await axios.get('https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/categories?slug=bydgoszcz');
                const bydgoszczCategoryId = bydgoszczCategoryIdResponse.data[0].id;

                const subCategoriesResponse = await axios.get(`https://weckwerthblog.wpcomstaging.com/wp-json/wp/v2/categories?parent=${bydgoszczCategoryId}`);

                const categoriesData = [];

                for (const category of subCategoriesResponse.data) {
                    const categoryId = category.id;
                    let categoryImage = '';

                    // Добавление изображения для каждой подкатегории на основе ее ID
                    switch (categoryId) {
                        case 718423471:
                            categoryImage = 'https://i.ibb.co/zJ5Jzyb/bydgoskie-osiedla-bez-filtrow.png';
                            break;
                        case 718423601:
                            categoryImage = 'https://i.ibb.co/m8p2TDv/bydgoszcz-nad-woda.png';
                            break;
                        case 729534262:
                            categoryImage = 'https://i.ibb.co/MRZfLWv/bydgoszcz.png';
                            break;
                        case 718423608:
                            categoryImage = 'https://i.ibb.co/12YdN6P/cuda-bydgoskie.png';
                            break;
                        case 718429647:
                            categoryImage = 'https://i.ibb.co/8cgTC3K/bydgoskie-ciekawostki.png';
                            break;
                        default:
                            categoryImage = ''; // По умолчанию пустое изображение, если ID не совпадает
                            break;
                    }

                    // Формирование объекта данных для каждой подкатегории
                    const categoryData = {
                        categoryName: category.name,
                        categoryImage: categoryImage,
                        postCount: category.count,
                        categorySlug: category.slug,
                        categoryId: categoryId,
                    };

                    categoriesData.push(categoryData);
                }

                setCategoriesData(categoriesData);
            } catch (error) {
                console.error('Error fetching categories data:', error);
            } finally {
                setLoading(false); // Установка состояния загрузки в false после завершения запроса
            }
        };

        fetchData();
    }, []);


    return (
        <SectionWrapper id="bydgoszcz" paddingBottom="100px" paddingTop="120px">
            <BreadCrumbs />
            <Typography variant="h1" className={classes.title}>
                Bydgoszcz
            </Typography>
            <Grid container spacing={3} className={classes.cardWrapper}>
                {categoriesData.map((category, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <Link to={`/bydgoszcz/${category.categorySlug}`} className={classes.linkWrapper}>
                            <Box className={classes.root}>
                                {category.categoryImage && (
                                    <div className={classes.imageContainer}>
                                        <img
                                            src={category.categoryImage}
                                            alt={category.categoryName}
                                            className={classes.image}
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                                <Box className={classes.textContainer}>
                                    <Box>
                                        <H4 className={classes.h4}>
                                            {category.categoryName}
                                        </H4>
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
                        </Link>
                    </Grid>
                ))}
            </Grid>
            <DonatBadgeComponent />
            <ContactForm />
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </SectionWrapper>
    );
};

export default BydgoszczPage;





