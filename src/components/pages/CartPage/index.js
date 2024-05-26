import React, {useEffect, useState} from 'react';
import {Box, Button, Grid, Typography} from '@material-ui/core';
import SectionWrapper from "../../UI/SectionWrapper";
import BreadCrumbs from "../../UI/BreadCrumbs";
import {useTheme} from "../../../theme/themeContext";
import {themes} from "../../../theme/themeContext/themes";
import useStyles from "./styles";
import {ReactComponent as DeleteIcon} from '../../../assets/Icons/delete-icon-for-sklep.svg';
import {ReactComponent as ViewIcon} from '../../../assets/Icons/view-icon.svg';
import StyledButton from "../../UI/StyledButton";
import DonatBadge from "../../UI/DonatBadge";
import ContactForm from "../../UI/ContactForm";
import GpayIcon from '../../../assets/Icons/g-pay.svg';
import ApplePayIcon from '../../../assets/Icons/apple-pay.svg';
import {Link} from "react-router-dom";
import {useFontSize} from "../../UI/FontSizeChange/FontSizeContext";

const CartPage = ({cartItems}) => {
    const {theme} = useTheme();
    const { fontSize } = useFontSize();
    const combinedTheme = {
        ...themes[theme],
        ...themes[fontSize]
    };

    const classes = useStyles(combinedTheme);
    const [localCartItems, setLocalCartItems] = useState([]);
    // eslint-disable-next-line no-unused-vars
    const [cartItemCount, setCartItemCount] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            const parsedCartItems = JSON.parse(storedCartItems);
            setLocalCartItems(parsedCartItems);
            setCartItemCount(parsedCartItems.length); // Установка начального количества товаров
        }
    }, []);

    const removeItem = (index) => {
        const newCartItems = [...localCartItems];
        newCartItems.splice(index, 1);
        setLocalCartItems(newCartItems);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems));

        // Обновление количества товаров после удаления
        setCartItemCount(newCartItems.length);
    };

    const totalPrice = localCartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);
    const deliveryCost = 5;
    const finalPrice = totalPrice + deliveryCost;

    return (
        <SectionWrapper id="CartPage" paddingBottom="100px" paddingTop="120px">
            <BreadCrumbs/>
            <Typography variant="h1" className={classes.titleSection}>
                KOSZ
            </Typography>
            <Grid container>
                <Grid item xs={12} md={9}>
                    {localCartItems.length === 0 ? (
                        <Box className={classes.emptySection}>
                            <Box className={classes.emptyProductCard}>
                                <Typography variant="body1" className={classes.titleEmptyCardSection}>Twoja koszyk jest
                                    pusty :(</Typography>
                                <StyledButton text="Wróć do sklepu" to="/sklep"/>
                            </Box>
                        </Box>
                    ) : (
                        <Box className={classes.cardWrapper}>
                            {localCartItems.map((item, index) => (
                                <Box key={index} className={classes.productCard}>
                                    <Box>
                                        {item.image &&
                                            <img src={item.image} alt={item.name} className={classes.image}/>}
                                    </Box>
                                    <Box className={classes.textContainer}>
                                        <Box className={classes.nameAndPrice}>
                                            <Typography className={classes.name}>{item.name}</Typography>
                                            <Typography className={classes.name}> {item.price} Zł</Typography>
                                        </Box>
                                        {(item.size || item.color) && (
                                            <Box className={classes.attributeInfo}>
                                                <Typography
                                                    className={classes.sizeInfo}>Rozmiar: {item.size}</Typography>
                                                <Box className={classes.colorInfo}>
                                                    <Typography>Kolor:</Typography>
                                                    <Box
                                                        className={classes.circleColor}
                                                        style={{backgroundColor: item.color.toLowerCase() === 'biały' ? 'white' : 'black'}}
                                                    />
                                                    <Typography>({item.color})</Typography>
                                                </Box>
                                            </Box>
                                        )}
                                        <Box className={classes.settingsProductButtonSection}>
                                            <Button className={classes.iconButton} onClick={() => removeItem(index)}>
                                                <DeleteIcon className={classes.icon}/>
                                            </Button>
                                            {item.slug && (
                                                <Link to={`/sklep/${item.slug}`} style={{textDecoration: 'none'}}>
                                                    <Button className={classes.iconButton}>
                                                        <ViewIcon className={classes.icon}/>
                                                    </Button>
                                                </Link>
                                            )}
                                        </Box>
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    )}
                    <Box className={classes.aboutPaymentSection}>
                        <Typography className={classes.aboutPaymentTitle}>Postanowienia dotyczące płatności</Typography>
                        <Box className={classes.paymentSystem}>
                            <img src={GpayIcon} alt="payment"/>
                            <img src={ApplePayIcon} alt="payment"/>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} md={3} className={classes.priceSection}>
                    <Box className={classes.summary}>
                        <Typography className={classes.summaryTitle}>Kwota</Typography>
                        <Typography className={classes.summaryPrice}>{totalPrice} Zł</Typography>
                    </Box>
                    <Box className={classes.summary}>
                        <Typography className={classes.summaryTitle}>Wysyłka</Typography>
                        <Typography className={classes.summaryPrice}> ot {deliveryCost} Zł</Typography>
                    </Box>
                    <Box className={classes.summary}>
                        <Typography className={classes.summaryTitle}>Łącznie</Typography>
                        <Typography className={classes.summaryPrice}>{finalPrice} Zł</Typography>
                    </Box>
                    <StyledButton width="100%" text="Przejdź do kasy"
                                  onClick={() => console.log('Przejdź do płatności')}
                                  to="/sklep/koszyk/podsumowanie"
                                  disabled={localCartItems.length === 0}
                    />
                </Grid>
            </Grid>
            <DonatBadge/>
            <ContactForm/>
        </SectionWrapper>
    );
};

export default CartPage;


