import React, {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {
    Backdrop,
    Box,
    CircularProgress, Icon,
    Typography
} from "@material-ui/core";
import SectionWrapper from "../../UI/SectionWrapper";
import BreadCrumbs from "../../UI/BreadCrumbs";
import {useTheme} from "../../../theme/themeContext";
import useStyles from "./styles";
import {themes} from "../../../theme/themeContext/themes";
import DonatBadge from "../../UI/DonatBadge";
import ContactForm from "../../UI/ContactForm";
import StyledButton from "../../UI/StyledButton";
import SklepCard from "../../UI/SklepCard";
import ProductModal from "../../UI/ProductModal";
import {useFontSize} from "../../UI/FontSizeChange/FontSizeContext";
import {ReactComponent as ArrowIcon} from "../../../assets/Icons/ArrowIcon.svg";


const ProductPage = ({setCartItems, cartItems}) => {
    const {productSlug} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const {theme} = useTheme();
    const {fontSize} = useFontSize();
    const combinedTheme = {
        ...themes[theme],
        ...themes[fontSize]
    };

    const classes = useStyles(combinedTheme);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для открытия модального окна
    // eslint-disable-next-line no-unused-vars
    const [selectedProduct, setSelectedProduct] = useState(null); // Состояние для хранения выбранного товара


    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`https://weckwerthblog.wpcomstaging.com/wp-json/wc/v3/products`, {
                    params: {
                        slug: productSlug,
                        consumer_key: process.env.REACT_APP_CONSUMER_KEY,
                        consumer_secret: process.env.REACT_APP_CONSUMER_SECRET,
                    }
                });

                console.log('Response data:', response.data); // Выводим полученные данные из запроса

                if (response.data.length > 0) {
                    const fetchedProduct = response.data[0];
                    console.log('Fetched product:', fetchedProduct); // Выводим информацию о полученном товаре

                    // Находим атрибут 'Rozmiar' (размер)
                    const sizeAttribute = fetchedProduct.attributes.find(attr => attr.name === 'Rozmiar');

                    if (sizeAttribute && sizeAttribute.options && sizeAttribute.options.length > 0) {
                        // Извлекаем список доступных размеров
                        const availableSizes = sizeAttribute.options.map(option => option);
                        console.log('Available sizes:', availableSizes); // Выводим список доступных размеров

                        // Преобразуем опции в имена размеров
                        const sizeNames = availableSizes.map(option => option.name);
                        fetchedProduct.sizes = sizeNames;
                    } else {
                        fetchedProduct.sizes = []; // Если размеры не найдены или пусты, устанавливаем пустой массив
                    }

                    setProduct(fetchedProduct);
                    setSelectedImage(fetchedProduct.images[0]?.src); // Выбираем первое изображение
                } else {
                    setProduct(null);
                }

                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productSlug]);


    // Функция для открытия модального окна с выбранным товаром
    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    // Функция для закрытия модального окна
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // Добавление товара в корзину и открытие модального окна с данными о товаре
    const handleAddToCart = () => {
        if (product) {
            const newItem = {
                name: product.name,
                price: parseFloat(product.price).toLocaleString('pl-PL'),
                size: selectedSize || '',
                color: selectedColor || '',
                image: product.images.length > 0 ? product.images[0].src : '',
                slug: product.slug,
                productId: product.id,
            };

            // Обновляем состояние корзины и сохраняем в localStorage
            setCartItems(prevItems => {
                const updatedCart = [...prevItems, newItem];
                localStorage.setItem('cartItems', JSON.stringify(updatedCart));
                return updatedCart;
            });

            // Открыть модальное окно с информацией о добавленном товаре
            openModal(product);

            // Сбросить выбранный размер и цвет на пустые значения
            setSelectedSize('');
            setSelectedColor('');

            console.log('Товар добавлен в корзину:', newItem);
        } else {
            console.log('Товар не выбран или отсутствует информация о нём');
        }
    };


    useEffect(() => {
        if (!loading) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }, [loading]);

    const handleImageClick = (imageSrc) => {
        setSelectedImage(imageSrc);
    };

    const handleSizeSelect = (size) => {
        setSelectedSize(size === selectedSize ? null : size); // Toggle selected size
    };

    const handleColorSelect = (color) => {
        setSelectedColor(color === selectedColor ? null : color); // Toggle selected color
    };

    const renderSizes = () => {
        if (!product || !product.attributes) {
            return null;
        }

        const sizeAttribute = product.attributes.find(attr => attr.name === 'Rozmiar');

        if (!sizeAttribute || !sizeAttribute.options || sizeAttribute.options.length === 0) {
            return null;
        }

        return (
            <>
                <Typography variant="body1" className={classes.info}>
                    Rozmiar
                </Typography>
                <Box className={classes.sizeInfo}>
                    {sizeAttribute.options.map((option, index) => (
                        <Box
                            key={index}
                            className={`${classes.sizeTag} ${selectedSize === option ? classes.selectedSize : ''}`}
                            onClick={() => handleSizeSelect(option)}
                        >
                            {option}
                        </Box>
                    ))}
                </Box>
            </>
        );
    };

    const renderColors = () => {
        if (!product || !product.attributes) {
            return null;
        }

        const colorAttribute = product.attributes.find(attr => attr.name === 'Kolor');

        if (!colorAttribute || !colorAttribute.options || colorAttribute.options.length === 0) {
            return null;
        }

        const isWhite = colorAttribute.options.includes('biały');

        return (
            <>
                <Typography variant="body1" className={classes.info}>
                    Kolor
                </Typography>
                <Box className={classes.sizeInfo}>
                    {colorAttribute.options.map((option, index) => (
                        <Box
                            key={index}
                            className={`${classes.colorTag} ${selectedColor === option ? classes.selectedColor : ''}`}
                            onClick={() => handleColorSelect(option)}
                            style={{backgroundColor: isWhite && option === 'biały' ? 'white' : 'black'}}
                        >
                            <Typography className={classes.displayNoneTextColor}>
                                {option}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </>
        );
    };

    const productPrice = product ? parseFloat(product.price).toLocaleString('pl-PL') : '';

    const isButtonDisabled = product && product.attributes &&
        product.attributes.some(attr => attr.name === 'Rozmiar') &&
        product.attributes.some(attr => attr.name === 'Kolor') &&
        (!selectedSize || !selectedColor);

    const nextImage = () => {
        const currentIndex = product.images.findIndex(image => image.src === selectedImage);
        const nextIndex = currentIndex === product.images.length - 1 ? 0 : currentIndex + 1;
        setSelectedImage(product.images[nextIndex].src);
    }

    const prevImage = () => {
        const currentIndex = product.images.findIndex(image => image.src === selectedImage);
        const prevIndex = currentIndex === 0 ? product.images.length - 1 : currentIndex - 1;
        setSelectedImage(product.images[prevIndex].src);
    }


    return (
        <SectionWrapper
            id="productPage"
            paddingBottom="100px"
            paddingTop="120px"
        >
            <BreadCrumbs/>
            <Box className={classes.root}>
                <Box className={classes.mainInfoRoot}>
                    <Box className={classes.imageWrapper}>
                        {product && product.images && product.images.length > 1 && (
                            <Box className={classes.imagesContainer}>
                                {product.images.slice(0, 5).map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.src}
                                        alt={product.name}
                                        className={classes.smallImage}
                                        onClick={() => handleImageClick(image.src)}
                                    />
                                ))}
                            </Box>
                        )}
                        {selectedImage && (
                            <Box className={classes.mainImageWrapper}>
                                <Box className={classes.arrowBoxWrapper}>
                                    <Box className={classes.arrowBox} onClick={prevImage}>
                                        <Icon component={ArrowIcon} src={ArrowIcon} className={classes.arrowIcon}/>
                                    </Box>
                                    <Box className={classes.arrowBox} onClick={nextImage}>
                                        <Icon component={ArrowIcon} src={ArrowIcon}
                                              className={classes.arrowIcon + ' ' + classes.arrowIconReverse}/>
                                    </Box>
                                </Box>
                                <img src={selectedImage} alt={product?.name} className={classes.image}/>
                            </Box>
                        )}
                    </Box>
                    <Box className={classes.textContainer}>
                        <Typography variant="h1" className={classes.titleSection}>
                            {product?.name}
                        </Typography>
                        <Typography variant="h5" className={classes.price}>
                            {productPrice} Zł
                        </Typography>
                        {renderSizes(handleSizeSelect)}
                        {renderColors(handleColorSelect)}
                        <StyledButton
                            width="100%"
                            text="Dodaj do koszyka"
                            disabled={isButtonDisabled}
                            clicked={handleAddToCart}
                        />
                    </Box>
                </Box>
                <Box>
                    <Typography variant="h2" className={classes.titleDescriptionSection}>
                        OPIS
                    </Typography>
                    <Typography variant="body1" className={classes.description}
                                dangerouslySetInnerHTML={{__html: product?.description}}/>
                </Box>
            </Box>
            <Box className={classes.nextInSection}>
                <Typography variant="h2" className={classes.titleDescriptionSection}>
                    Polecamy również
                </Typography>
                <SklepCard postLimit={3} random={true}/>
            </Box>
            <DonatBadge/>
            <ContactForm/>
            <Backdrop className={classes.backdrop} open={loading}>
                <CircularProgress color="inherit"/>
            </Backdrop>
            <ProductModal
                isOpen={isModalOpen}
                handleClose={closeModal}
                cartItems={cartItems}
            />
        </SectionWrapper>
    );
};

export default ProductPage;
