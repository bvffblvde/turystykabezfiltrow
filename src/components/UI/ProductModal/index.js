import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    image: {
        maxWidth: '100%',
        marginBottom: theme.spacing(2),
    },
}));

const ProductModal = ({ isOpen, handleClose, product }) => {
    const classes = useStyles();

    if (!product) {
        return null;
    }

    const { name, price, sizes, colors, images } = product;
    const selectedSize = sizes && sizes.find((size) => size.selected); // Проверка на наличие sizes и поиск выбранного размера
    const selectedColor = colors && colors.find((color) => color.selected); // Проверка на наличие colors и поиск выбранного цвета
    const firstImageSrc = images && images.length > 0 ? images[0].src : null;

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            className={classes.modal}
            aria-labelledby="product-modal-title"
            aria-describedby="product-modal-description"
        >
            <div className={classes.paper}>
                {firstImageSrc && (
                    <img src={firstImageSrc} alt={name} className={classes.image} />
                )}
                <Typography variant="h5" id="product-modal-title" gutterBottom>
                    {name}
                </Typography>
                <Typography variant="body1" id="product-modal-description" gutterBottom>
                    {selectedSize && `Размер: ${selectedSize}`}
                </Typography>
                <Typography variant="body1" id="product-modal-description" gutterBottom>
                    {selectedColor && `Цвет: ${selectedColor}`}
                </Typography>
                <Typography variant="body1" id="product-modal-description" gutterBottom>
                    Цена: {parseFloat(price).toLocaleString('pl-PL')} Zł
                </Typography>
            </div>
        </Modal>
    );
};

export default ProductModal;
