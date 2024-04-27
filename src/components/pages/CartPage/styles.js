import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    titleSection: {
        fontFamily: 'Inter-Bold',
        fontSize: '60px',
        fontWeight: '500',
        color: ({textColor}) => textColor,
        textAlign: 'center',
        marginBottom: '32px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
            marginBottom: '20px',
        }
    },
    titleEmptyCardSection: {
        fontFamily: 'Inter-Regular',
        fontSize: '24px',
        fontWeight: '500',
        color: ({textColor}) => textColor,
        textAlign: 'center',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    productSection: {
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #E5E5E5',
        borderBottom: '1px solid #E5E5E5',
    },
    image: {
        aspectRatio: '1/1',
        width: '200px',
        height: '100%',
        objectFit: 'cover',
        borderRadius: '10px',
    },
    root: {
        display: 'flex',
        flexDirection: 'row',
    },
    productCard: {
        backgroundColor: ({backgroundColor}) => backgroundColor,
        color: ({textColor}) => textColor,
        display: 'flex',
        flexDirection: 'row',
        cursor: 'pointer',
        gap: '20px',
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
        '&:hover $mainTitle': {
            transition: "all 0.3s ease-out",
            color: ({postsHoverTextColor}) => postsHoverTextColor,
        },
    },
    emptyProductCard: {
        backgroundColor: ({backgroundColor}) => backgroundColor,
        color: ({textColor}) => textColor,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        gap: '20px',
        height: '30vh',
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
        '&:hover $mainTitle': {
            transition: "all 0.3s ease-out",
            color: ({postsHoverTextColor}) => postsHoverTextColor,
        },
    },
    emptySection: {
      paddingRight: '20px',
      paddingBottom: '20px',
      borderBottom: '1px solid #E5E5E5',
    },
    nameAndPrice: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        marginBottom: '12px',
    },
    textContainer: {
        width: '100%',
    },
    name: {
        fontFamily: 'Inter-Regular',
        fontSize: '24px',
        fontWeight: 700,
        color: ({textColor}) => textColor,
    },
    colorInfo: {
        display: 'flex',
        flexDirection: 'row',
        gap: '5px',
        alignItems: 'center',
        textTransform: 'capitalize',
    },
    circleColor: {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        border: '1px solid',
        borderColor: ({textColor}) => textColor,
    },
    cardWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        paddingBottom: '20px',
        borderBottom: '1px solid #E5E5E5',
        paddingRight: '20px',

    },
    aboutPaymentSection: {
      paddingRight: '20px',
      margin: '20px 0 50px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    paymentSystem: {
      display: 'flex',
        flexDirection: 'row',
        gap: '20px',
    },
    aboutPaymentTitle: {
      fontFamily: 'Inter-Regular',
        fontSize: '16px',
        color: ({textColor}) => textColor,
    },
    priceSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        paddingLeft: '20px',
        borderLeft: '1px solid #E5E5E5',
    },
    attributeInfo: {
      display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '10px',
    },
    iconButton: {
        border: '1px solid',
        borderColor: ({backgroundColor}) => backgroundColor,
        width: '40px',
        padding: '0',
        height: '40px',
        minWidth: '40px',
        backgroundColor: ({backgroundColor}) => backgroundColor,
        display: 'flex',
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
    summary: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    summaryTitle: {
        fontFamily: 'Inter-Regular',
        fontSize: '16px',
        fontWeight: 700,
        color: ({textColor}) => textColor,
    },
    summaryPrice: {
        fontFamily: 'Inter-Regular',
        fontSize: '16px',
        color: ({textColor}) => textColor,
    }
}));

export default useStyles;