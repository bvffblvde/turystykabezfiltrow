import React, {useEffect, useState} from 'react';
import {
    Typography,
    Grid,
    Box,
    TextField,
    Radio,
    RadioGroup,
    FormControlLabel, Button, Snackbar,
} from '@material-ui/core';
import {useTheme} from '../../../theme/themeContext';
import {themes} from '../../../theme/themeContext/themes';
import SectionWrapper from "../../UI/SectionWrapper";
import GpayIcon from '../../../assets/Icons/g-pay.svg';
import ApplePayIcon from '../../../assets/Icons/apple-pay.svg';
import Breadcrumbs from "../../UI/BreadCrumbs";
import StyledButton from "../../UI/StyledButton";
import useStyles from "./styles";
import {Formik, Form, Field} from 'formik';
import validationSchema from './validationSchema';
import CardType from '../../../assets/Icons/cardType.svg';
import ContactForm from "../../UI/ContactForm";
import DonatBadge from "../../UI/DonatBadge";
import renderCardForm from './cardForm';
import deliveryForm from "./deliveryForm";
import axios from "axios";

const initialValuesData = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    city: '',
    deliveryType: 'self-pickup',
    street: '',
    houseNumber: '',
    postalCode: '',
    region: '',
    apartment: '',
    buyType: 'iban',
    cvv: '',
    cardNumber: '',
    expirationDate: '',
    accept: false,
};


const PayPage = ({cartItems}) => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);
    const [localCartItems, setLocalCartItems] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            setLocalCartItems(JSON.parse(storedCartItems));
        }
    }, []);

    const handleSubmit = async (values, {setSubmitting, resetForm}) => {
        setSubmitting(true);

        try {
            const apiKey = process.env.REACT_APP_CONSUMER_KEY;
            const apiSecret = process.env.REACT_APP_CONSUMER_SECRET;
            const authHeader = `Basic ${btoa(`${apiKey}:${apiSecret}`)}`;

            const localCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

            const lineItems = localCartItems.map(item => ({
                product_id: item.productId,
                quantity: item.quantity,
                meta_data: [
                    {
                        key: 'size',
                        value: item.size,
                    },
                    {
                        key: 'color',
                        value: item.color,
                    },
                ],
            }));

            const orderData = {
                payment_method: values.buyType,
                billing: {
                    first_name: values.firstName,
                    last_name: values.lastName,
                    address_1: values.street,
                    city: values.city,
                    postcode: values.postalCode,
                    email: values.email,
                    phone: values.phoneNumber,
                    card_number: values.cardNumber,
                    expiration_date: values.expirationDate,
                    cvv: values.cvv,
                },
                line_items: lineItems,
            };

            if (values.deliveryType === 'delivery') {
                orderData.shipping = {
                    first_name: values.firstName,
                    last_name: values.lastName,
                    address_1: values.street,
                    address_2: values.houseNumber,
                    city: values.city,
                    postcode: values.postalCode,
                    country: values.region,
                    state: values.region,
                    phone: values.phoneNumber,
                    email: values.email,
                };
                orderData.shipping_lines = [
                    {
                        method_id: 'flat_rate',
                        method_title: 'Courier',
                        total: '19.99',
                    },
                ];
            }

            const response = await axios.post('https://weckwerthblog.wpcomstaging.com/wp-json/wc/v3/orders', orderData, {
                headers: {
                    Authorization: authHeader,
                },
            });

            setSnackbarOpen(true);
            console.log('Order created:', response.data);
        } catch (error) {
            console.error('Error creating order:', error);
            if (error.response) {
                console.log('Response data:', error.response.data);
                console.log('Response status:', error.response.status);
                console.log('Response headers:', error.response.headers);
            } else if (error.request) {
                console.log('Request:', error.request);
            } else {
                console.log('Error:', error.message);
            }
        }

        localStorage.removeItem('cartItems');
        setLocalCartItems([]);
        resetForm();

        setSubmitting(false);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };


    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            const parsedCartItems = JSON.parse(storedCartItems);
            setLocalCartItems(parsedCartItems);
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const totalPrice = localCartItems.reduce((acc, item) => acc + parseFloat(item.price), 0);
    const deliveryCost = 19.99;
    const finalPrice = totalPrice + deliveryCost;

    return (
        <SectionWrapper id="CartPage" paddingBottom="100px" paddingTop="120px">
            <Breadcrumbs/>
            <Typography variant="h1" className={classes.titleSection}>
                Zamówienie
            </Typography>
            <Box className={classes.root}>
                <Formik
                    initialValues={initialValuesData}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({isSubmitting, isValid, errors, touched, values, setFieldValue}) => (
                        <Form className={classes.formSection}>
                            <Typography variant="h2" className={classes.subTitle}>Płatność i wysyłka</Typography>
                            <Grid container spacing={3} className={classes.formSection}>
                                <Grid item xs={12} md={6}>
                                    <Field name="name">
                                        {({field, form}) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label="Imię:"
                                                variant="outlined"
                                                name="firstName"
                                                error={form.errors.firstName && form.touched.firstName}
                                                helperText={form.touched.firstName && form.errors.firstName}
                                            />
                                        )}
                                    </Field>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Field name="lastName">
                                        {({field, form}) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label="Nazwisko:"
                                                variant="outlined"
                                                name="lastName"
                                                error={form.errors.lastName && form.touched.lastName}
                                                helperText={form.touched.lastName && form.errors.lastName}
                                            />
                                        )}
                                    </Field>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Field name="phoneNumber">
                                        {({field, form}) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label="Numer telefonu:"
                                                variant="outlined"
                                                name="phoneNumber"
                                                error={form.errors.phoneNumber && form.touched.phoneNumber}
                                                helperText={form.touched.phoneNumber && form.errors.phoneNumber}
                                            />
                                        )}
                                    </Field>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Field name="email">
                                        {({field, form}) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label="E-Mail:"
                                                variant="outlined"
                                                name="email"
                                                error={form.errors.email && form.touched.email}
                                                helperText={form.touched.email && form.errors.email}
                                            />
                                        )}
                                    </Field>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <Field name="city">
                                        {({field, form}) => (
                                            <TextField
                                                {...field}
                                                fullWidth
                                                label="Miasto:"
                                                variant="outlined"
                                                name="city"
                                                error={form.errors.city && form.touched.city}
                                                helperText={form.touched.city && form.errors.city}
                                            />
                                        )}
                                    </Field>
                                </Grid>
                            </Grid>
                            <Typography variant="h2" className={classes.subTitle}>Dostawa</Typography>
                            <Grid container spacing={3} className={classes.formSection}>
                                <Grid item xs={12} md={12}>
                                    <RadioGroup
                                        name="deliveryType"
                                        value={values.deliveryType}
                                        onChange={(event) => {
                                            const {value} = event.target;
                                            setFieldValue('deliveryType', value); // Обновляем значение deliveryType
                                        }}
                                    >
                                        <Box className={classes.radioSection}>
                                            <Box className={classes.deliveryWrapper}>
                                                <FormControlLabel
                                                    value="self-pickup"
                                                    control={<Radio/>}
                                                    label="Odbiór osobisty: ul.Bohaterów Westerplatte 1, 85-827 Bydgoszcz, tel.+48884002977"
                                                />
                                                {/*<Typography className={classes.deliveryTitle}>Jest*/}
                                                {/*    bezpłatny</Typography>*/}
                                            </Box>
                                        </Box>
                                        <Box className={classes.radioSection}>
                                            <Box className={classes.deliveryWrapper}>
                                                <FormControlLabel
                                                    value="delivery"
                                                    control={<Radio/>}
                                                    label="Kurier"
                                                />
                                                <Typography className={classes.deliveryTitle}>19.99 zł</Typography>
                                            </Box>
                                            {values.deliveryType === 'delivery' && (deliveryForm(values, setFieldValue))}
                                        </Box>
                                    </RadioGroup>
                                </Grid>
                            </Grid>
                            <Typography variant="h2" className={classes.subTitle}>Zapłata</Typography>
                            <Grid container spacing={3}>
                                <Grid item md={12} xs={12}>
                                    <Typography variant="h3" className={classes.paymentManual}><bold>BANK:</bold> mBank S.A.</Typography>

                                    <Typography variant="h3" className={classes.paymentManual}><bold>ACCOUNT NUMBER:</bold> 15 1140 2004 0000 3502 8194 7323 </Typography>

                                    <Typography variant="h3" className={classes.paymentManual}><bold>IBAN:</bold> PL15 1140 2004 0000 3502 8194 7323</Typography>

                                    <Typography variant="h3" className={classes.paymentManual}><bold>BIC:</bold>BREXPLPWMBK </Typography>

                                </Grid>
                            </Grid>
                            <Grid container spacing={3} className={classes.formSection}>
                                <Grid item xs={12} md={6}>
                                    <Box className={classes.costCardWrapper}>
                                        <Typography variant="h2" className={classes.priceInfoTitle}>Łącznie</Typography>
                                        <Box className={classes.priceInfoSection}>
                                            <Typography>Kwota</Typography>
                                            <Typography>{totalPrice} Zł</Typography>
                                        </Box>
                                        <Box className={classes.priceInfoSection}>
                                            <Typography>Koszty wysyłki</Typography>
                                            <Typography>{values.deliveryType === 'delivery' ? deliveryCost : '0.00'} Zł</Typography>
                                        </Box>
                                        <Box className={classes.priceInfoSection}>
                                            <Typography>Płatne na rzecz</Typography>

                                            <Typography>
                                                {values.deliveryType === 'self-pickup' ? totalPrice : finalPrice} Zł
                                            </Typography>
                                        </Box>
                                    </Box>
                                    <StyledButton type="submit" width="100%" text="Złóż zamówienie"
                                                  disabled={isSubmitting || !isValid} className={classes.submitButton}/>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <RadioGroup
                                        name="buyType"
                                        value={values.buyType}
                                        onChange={(event) => {
                                            const {value} = event.target;
                                            setFieldValue('buyType', value); // Обновляем значение deliveryType
                                        }}
                                    >
                                        <Box className={classes.radioSection}>
                                            <Box className={classes.deliveryWrapper}>
                                                <FormControlLabel
                                                    value="iban"
                                                    control={<Radio/>}
                                                    label="Przelew bankowy"
                                                />
                                            </Box>
                                            <Box className={classes.deliveryWrapper}>
                                                <FormControlLabel
                                                    value="google-pay"
                                                    control={<Radio/>}
                                                    label="Google Pay (Wkrótce)"
                                                    disabled={true}
                                                />
                                                <img src={GpayIcon} alt="Google Pay" className={classes.paymentIcon}/>
                                            </Box>
                                            <Box className={classes.deliveryWrapper}>
                                                <FormControlLabel
                                                    value="apple-pay"
                                                    control={<Radio/>}
                                                    label="Apple Pay (Wkrótce)"
                                                    disabled={true}
                                                />
                                                <img src={ApplePayIcon} alt="Apple Pay"
                                                     className={classes.paymentIcon}/>
                                            </Box>
                                        </Box>
                                        <Box className={classes.radioSection}>
                                            <Box className={classes.deliveryWrapper}>
                                                <FormControlLabel
                                                    value="visaOrMastercard"
                                                    control={<Radio/>}
                                                    label="Karta (Wkrótce)"
                                                    disabled={true}
                                                />
                                                <img src={CardType} alt="Visa Or Mastercard"
                                                     className={classes.paymentIcon}/>
                                            </Box>
                                            {values.buyType === 'visaOrMastercard' && (renderCardForm(values, setFieldValue))}
                                        </Box>
                                    </RadioGroup>
                                </Grid>
                            </Grid>
                        </Form>
                    )}
                </Formik>
            </Box>
            <DonatBadge/>
            <ContactForm/>
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Box
                    sx={{
                        width: '100%',
                        bgcolor: '#4CAF50',
                        color: 'white',
                        fontFamily: 'Inter-Regular',
                        fontSize: '16px',
                        textAlign: 'center',
                        p: 2,
                        borderRadius: '6px',
                    }}
                    elevation={6}
                >
                    Zamówienie zostało złożone
                </Box>
            </Snackbar>
        </SectionWrapper>
    );
};

export default PayPage;
