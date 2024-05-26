import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    titleSection: {
        fontFamily: 'Inter-Bold',
        fontSize: ({h3FontSize}) => h3FontSize,
        fontWeight: '500',
        color: ({textColor}) => textColor,
        textAlign: 'left',
        [theme.breakpoints.down('sm')]: {
            fontSize: ({h3FontSizeMobile}) => h3FontSizeMobile,
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
        position: 'relative',
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
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
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
        fontSize: ({h3FontSize}) => h3FontSize,
        fontWeight: '500',
        color: ({textColor}) => textColor,
        [theme.breakpoints.down('sm')]: {
            fontSize: ({h3FontSizeMobile}) => h3FontSizeMobile,
        }
    },
    mainInfoRoot: {
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        marginBottom: '60px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            marginBottom: '32px',
        }

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
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
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
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: ({descriptionTextFontSizeMobile}) => descriptionTextFontSizeMobile,
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
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
        textAlign: 'left',
        color: ({textColor}) => textColor,
        [theme.breakpoints.down('sm')]: {
            fontSize: ({descriptionTextFontSizeMobile}) => descriptionTextFontSizeMobile,
        }
    },
    displayNoneTextColor: {
        display: 'none',
    },
    titleDescriptionSection: {
        fontFamily: 'Inter-Regular',
        fontSize: ({h3FontSize}) => h3FontSize,
        fontWeight: '700',
        color: ({textColor}) => textColor,
        textAlign: 'left',
        marginBottom: '16px',
        textTransform: 'uppercase',
        [theme.breakpoints.down('sm')]: {
            fontSize: ({h3FontSizeMobile}) => h3FontSizeMobile,
        }
    },
    description: {
        fontFamily: 'Inter-Regular',
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
        fontWeight: '400',
        color: ({textColor}) => textColor,
        textAlign: 'left',
        marginBottom: '100px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '60px',
            fontSize: ({descriptionTextFontSizeMobile}) => descriptionTextFontSizeMobile,

        }
    },
    nextInSection: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '80px',
    },
    arrowBox: {
        width: '40px',
        height: '40px',
        borderRadius: '6px',
        backgroundColor: ({backgroundColor}) => backgroundColor,
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }
    },
    arrowIcon: {
        "& path": {
            transition: '0.3ms ease-in-out',
            stroke: ({iconColorFill}) => iconColorFill,
        },
    },

    arrowIconReverse: {
        transform: 'rotate(180deg)',
    },
    arrowBoxWrapper: {
        position: 'absolute',
        top: '50%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    }
}));

export default useStyles;