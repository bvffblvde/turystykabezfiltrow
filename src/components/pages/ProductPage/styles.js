import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    titleSection: {
        fontFamily: 'Inter-Bold',
        fontSize: '24px',
        fontWeight: '500',
        color: ({textColor}) => textColor,
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    image: {
        width: '100%',
        height: '100%',
        transition: 'all 0.3s ease-in-out',
        aspectRatio: '1/1',
        objectFit: 'cover',
        borderRadius: '10px',
        cursor: 'pointer',
    },
    mainImageWrapper: {
        height: '100%',
    },
    smallImage: {
        width: '100%',
        height: 'auto',
        aspectRatio: '1/1',
        objectFit: 'cover',
        borderRadius: '10px',
        cursor: 'pointer',
    },
    imagesContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: '20px', // Отступ между карточками
    },
    imageWrapper: {
        flex: 1,
        display: 'grid',
        gridTemplateColumns: 'calc(20% - 20px) calc(80%)', // Разделяем блоки с учетом gap
        gap: '20px',
        alignItems: 'stretch', // Растягиваем блоки по высоте
        [theme.breakpoints.down('sm')]: {
            gridTemplateColumns: '1fr', // Одна колонка в мобильной версии
        },
    },
    price: {
        fontFamily: 'Inter-Bold',
        fontSize: '24px',
        fontWeight: '500',
        color: ({textColor}) => textColor,
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
        }
    },
    mainInfoRoot: {
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        marginBottom: '60px',

    },
    textContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },
    root: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    sizeInfo: {
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
    },
    sizeTag: {
        fontFamily: 'Inter-Bold',
        fontSize: '16px',
        fontWeight: '500',
        color: ({textColor}) => textColor,
        backgroundColor: ({backgroundColor}) => backgroundColor,
        borderRadius: '6px',
        width: '40px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        boxShadow: '0px 0px 16px 0px #0000000f',
        transition: "all 0.5s ease-out",
        '&:hover': {
            transition: "all 0.5s ease-out",
            transform: 'scale(1.05)',
            color: ({postsHoverTextColor}) => postsHoverTextColor,
        }
    },
    selectedSize: {
        backgroundColor: ({postsHoverTextColor}) => postsHoverTextColor,
        '&:hover': {
            color: ({backgroundColor}) => backgroundColor,
        }
    },
    colorTag: {
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        border: '2px solid',
        borderColor: ({textColor}) => textColor,
        boxShadow: '0px 0px 16px 0px #0000000f',
        transition: "all 0.5s ease-out",
        cursor: 'pointer',
        '&:hover': {
            transition: "all 0.5s ease-out",
            transform: 'scale(1.05)',
        }
    },
    selectedColor: {
        borderColor: ({postsHoverTextColor}) => postsHoverTextColor,
    },
    info: {
        fontFamily: 'Inter-Bold',
        fontSize: '16px',
        textAlign: 'left',
        color: ({textColor}) => textColor,
    },
    displayNoneTextColor: {
        display: 'none',
    },
    titleDescriptionSection: {
        fontFamily: 'Inter-Regular',
        fontSize: '24px',
        fontWeight: '700',
        color: ({textColor}) => textColor,
        textAlign: 'left',
        marginBottom: '16px',
        textTransform: 'uppercase',
    },
    description: {
        fontFamily: 'Inter-Regular',
        fontSize: '16px',
        fontWeight: '400',
        color: ({textColor}) => textColor,
        textAlign: 'left',
        marginBottom: '100px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '60px',
        }
    },
    nextInSection: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '80px',
    }
}));

export default useStyles;