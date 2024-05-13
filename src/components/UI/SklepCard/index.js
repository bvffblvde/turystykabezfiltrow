import React, {useEffect, useState} from "react";
import axios from "axios";
import {Box, Grid, Icon, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";
import useStyles from "./styles";
import {useTheme} from "../../../theme/themeContext";
import {themes} from "../../../theme/themeContext/themes";
import {ReactComponent as BasketIcon} from "../../../assets/Icons/Basket.svg";


const SklepCardWrapper = ({product}) => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);

    return (
        <Link to={`/sklep/${product.slug}`} className={classes.linkWrapper}>
            <Box className={classes.root}>
                <Box className={classes.imageContainer}>
                    <img
                        src={product.image.src}
                        alt={product.name}
                        className={classes.image}
                        loading="lazy"
                    />
                </Box>
                <Box className={classes.textContainer}>
                    <Box>
                        <Typography className={classes.mainTitle}>{product.name}</Typography>
                    </Box>
                    <Box className={classes.priceWithButton}>
                        <Typography
                            variant="body2"
                            className={classes.price}
                            dangerouslySetInnerHTML={{__html: product.price_html}}
                        />
                        <Box>
                            <Link to={`/sklep/${product.slug}`} className={classes.iconLink}>
                                <Icon
                                    component={BasketIcon}
                                    className={classes.icon}
                                    src={BasketIcon}
                                />
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Link>
    );
};

const SklepCardMiniWrapper = ({product}) => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);

    return (
        <Link to={`/sklep/${product.slug}`} className={classes.linkWrapper}>
            <Box className={classes.rootMini}>
                <Box className={classes.imageContainer}>
                    <img
                        src={product.image.src}
                        alt={product.name}
                        className={classes.imageMini}
                        loading="lazy"
                    />
                </Box>
                <Box className={classes.textContainerMini}>
                    <Typography className={classes.mainTitleMini}>{product.name}</Typography>
                    <Typography
                        variant="body2"
                        className={classes.price}
                        dangerouslySetInnerHTML={{__html: product.price_html}}
                    />
                </Box>
            </Box>
        </Link>
    );
}

const SklepCard = ({postLimit, random, smallCardVariant}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://weckwerthblog.wpcomstaging.com/wp-json/wc/v3/products`, {
                    params: {
                        consumer_key: process.env.REACT_APP_CONSUMER_KEY,
                        consumer_secret: process.env.REACT_APP_CONSUMER_SECRET,
                    }
                });

                const productsData = response.data.map((product) => ({
                    id: product.id,
                    name: product.name,
                    slug: product.slug,
                    description: product.description,
                    price_html: product.price_html,
                    image: product.images[0],
                }));

                if (random) {
                    // Перемешиваем все полученные товары
                    const shuffledProducts = shuffleArray(productsData);
                    setProducts(shuffledProducts.slice(0, postLimit)); // Ограничиваем количество товаров до cardLimit
                } else {
                    setProducts(productsData.slice(0, postLimit)); // Ограничиваем количество товаров без перемешивания
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [random, postLimit]);

    const classes = useStyles();

    return (
        <>
            {smallCardVariant ? (
                <Grid container spacing={3} className={classes.cardWrapper}>
                    {products.map((product) => (
                        <Grid item xs={3} sm={3} md={3} key={product.id}>
                            <SklepCardMiniWrapper product={product}/>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Grid container spacing={3} className={classes.cardWrapper}>
                    {products.map((product) => (
                        <Grid item xs={12} sm={6} md={4} key={product.id}>
                            <SklepCardWrapper product={product}/>
                        </Grid>
                    ))}
                </Grid>
            )}
        </>
    );
};

const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

export default SklepCard;
