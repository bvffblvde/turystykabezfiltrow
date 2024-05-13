import React, {useEffect, useState} from 'react';
import {Modal, Typography, IconButton, Box} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import {useTheme} from "../../../theme/themeContext";
import useStyles from "./styles";
import {themes} from "../../../theme/themeContext/themes";
import StyledButton from "../StyledButton";
import SklepCard from "../SklepCard";

const ProductModal = ({isOpen, handleClose, cartItems}) => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);

    const [lastCartItem, setLastCartItem] = useState(null);

    useEffect(() => {
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            const parsedCartItems = JSON.parse(storedCartItems);
            if (parsedCartItems.length > 0) {
                const lastItem = parsedCartItems[parsedCartItems.length - 1];
                setLastCartItem(lastItem);
            }
        }
    }, [isOpen]);

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            className={classes.modal}
            aria-labelledby="product-modal-title"
            aria-describedby="product-modal-description"
        >
            {lastCartItem && (
                <div className={classes.paper}>
                    <Box className={classes.headerModal}>
                        <IconButton className={classes.closeButton} onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                    <Box className={classes.modalContent}>
                        <Box>
                            <Typography className={classes.modalTitle}>
                                Został dodany do koszyka
                            </Typography>
                        </Box>
                        <Box className={classes.infoAboutSelectProduct}>
                            <Box className={classes.imageWrapper}>
                                <img src={lastCartItem.image} alt={lastCartItem.name} className={classes.image}/>
                            </Box>
                            <Box className={classes.textInfoAboutProductWrapper}>
                                <Typography variant="h5" id="product-modal-title" className={classes.nameProduct}>
                                    {lastCartItem.name}
                                </Typography>
                                <Typography variant="body1" id="product-modal-description">
                                    Rozmiar: {lastCartItem.size}
                                </Typography>
                                <Box style={{display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center'}}>
                                    <Typography variant="body1" id="product-modal-description" className={classes.colorAndSizeInfoText}>
                                        Kolor:
                                    </Typography>
                                    <Box
                                        className={classes.circleColor}
                                        style={{backgroundColor: lastCartItem.color.toLowerCase() === 'biały' ? 'white' : 'black'}}
                                    />
                                </Box>
                                <Typography variant="body1" id="product-modal-description" className={classes.priceInfo}>
                                    {lastCartItem.price} Zł
                                </Typography>
                            </Box>
                        </Box>
                        <Box className={classes.buttonWrapper}>
                            <StyledButton width="100%" text="Kontynuować zakupy" clicked={handleClose} variant='outlined'/>
                            <StyledButton width="100%" text="Przejdź do koszyka" to="/sklep/koszyk"/>
                        </Box>
                        <Box className={classes.propossal}>
                            <Typography variant="body1" id="product-modal-description" className={classes.propossalText}>
                                Często kupowane od razu
                            </Typography>
                            <Box>
                                <SklepCard postLimit={4} random={true} smallCardVariant={true}/>
                            </Box>
                        </Box>
                    </Box>
                </div>
            )}
        </Modal>
    );
};

export default ProductModal;

