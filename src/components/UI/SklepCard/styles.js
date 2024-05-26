import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: ({backgroundColor}) => backgroundColor,
        color: ({textColor}) => textColor,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        cursor: 'pointer',
        padding: '10px 10px 20px 10px',
        boxShadow: '0px 0px 16px 0px #0000000f',
        transition: "all 0.5s ease-out",
        borderRadius: '16px',
        '&:hover': {
            transition: "all 0.5s ease-out",
            transform: 'scale(1.02)',
            // '& $image': {
            //     transition: "all 0.5s ease-out",
            //     transform: 'scale(1.05)',
            // },
        },
        '&:hover $mainTitle': {
            transition: "all 0.3s ease-out",
            color: ({postsHoverTextColor}) => postsHoverTextColor,
        },
    },
    rootMini: {
        backgroundColor: ({backgroundColor}) => backgroundColor,
        color: ({textColor}) => textColor,
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        padding: '10px',
        boxShadow: '0px 0px 16px 0px #0000000f',
        transition: "all 0.5s ease-out",
        borderRadius: '16px',
        '&:hover': {
            transition: "all 0.5s ease-out",
            transform: 'scale(1.02)',
            // '& $image': {
            //     transition: "all 0.5s ease-out",
            //     transform: 'scale(1.05)',
            // },
        },
        '&:hover $mainTitleMini': {
            transition: "all 0.3s ease-out",
            color: ({postsHoverTextColor}) => postsHoverTextColor,
        },
    },
    textContainer: {
        flex: 1,
    },
    priceWithButton: {
      display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textContainerMini: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },
    image: {
        transition: "all 0.3s ease-out",
        width: '100%',
        height: '50vh',
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: '10px',
        [theme.breakpoints.down('sm')]: {
            height: '30vh',
        }
    },
    imageMini: {
        transition: "all 0.3s ease-out",
        width: '100%',
        aspectRatio: '1/1',
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: '6px',
    },
    imageContainer: {
        display: 'flex',
        flex: '0 0 auto',
        overflow: 'hidden',
        marginBottom: '12px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '10px',
        }
    },
    //TODO: refactor
    cardWrapper: {
        marginBottom: '6px',
    },
    cardWrapperMini: {
      display: 'flex',
        flexDirection: 'row',
        gap: '10px',

    },
    linkWrapper: {
        textDecoration: 'none',
        color: 'inherit', // Унаследовать цвет из родительского элемента
    },
    description: {
        fontFamily: 'Inter-Regular',
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
        fontWeight: '400',
        lineClamp: 4,
        boxOrient: 'vertical',
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginBottom: '32px',
        [theme.breakpoints.down('sm')]: {
            fontSize: ({descriptionTextFontSizeMobile}) => descriptionTextFontSizeMobile,
            marginBottom: '16px',
        }
    },
    mainTitle: {
        fontFamily: 'Inter-Regular',
        transition: "all 0.3s ease-out",
        color: ({textColor}) => textColor,
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
        marginBottom: '12px',
        [theme.breakpoints.down('sm')]: {
            fontSize: ({descriptionFontSizeMobile}) => descriptionFontSizeMobile,
            marginBottom: '10px',
        }
    },
    mainTitleMini: {
        fontFamily: 'Inter-Regular',
        transition: "all 0.3s ease-out",
        color: ({textColor}) => textColor,
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
        marginBottom: '12px',
        lineClamp: 2,
        boxOrient: 'vertical',
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        [theme.breakpoints.down('sm')]: {
            fontSize: ({descriptionTextFontSizeMobile}) => descriptionTextFontSizeMobile,
            marginBottom: '10px',
        }
    },
    price: {
        fontFamily: 'Inter-Regular',
        fontSize: ({h4FontSize}) => h4FontSize,
        fontWeight: '500',
        color: ({textColor}) => textColor,
        [theme.breakpoints.down('sm')]: {
            fontSize: ({h4FontSizeMobile}) => h4FontSizeMobile,
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    iconLink: {
        border: '1px solid',
        borderColor: ({backgroundColor}) => backgroundColor,
        width: '40px',
        padding: '0',
        height: '40px',
        minWidth: '40px',
        backgroundColor: ({backgroundColor}) => backgroundColor,
        display: 'flex',
        borderRadius: '4px',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0px 0px 16px 0px #0000000f',
        transition: "all 0.5s ease-out",

        "& path": {
            transition: "all 0.5s ease-out",
            fill: ({iconColorFill}) => iconColorFill,
        },

        '&:hover': {
            transition: "all 0.5s ease-out",
            transform: 'scale(1.02)',
            borderColor: ({postsHoverTextColor}) => postsHoverTextColor,
            backgroundColor: ({backgroundColor}) => backgroundColor,
            // '& $image': {
            //     transition: "all 0.5s ease-out",
            //     transform: 'scale(1.05)',
            // },
            "& path": {
                transition: '300ms ease-in-out',
                fill: ({iconColorFillHover}) => iconColorFillHover,
            },
        },
    },
}));

export default useStyles;

