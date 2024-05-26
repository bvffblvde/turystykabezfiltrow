import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    titleSection: {
        fontFamily: 'Inter-Bold',
        fontSize: ({titleSectionFontSize}) => titleSectionFontSize,
        fontWeight: '500',
        color: ({textColor}) => textColor,
        textAlign: 'center',
        marginBottom: '32px',
        [theme.breakpoints.down('sm')]: {
            fontSize: ({titleSectionFontSizeMobile}) => titleSectionFontSizeMobile,
            marginBottom: '20px',
        }
    },
    titleEmptyCardSection: {
        fontFamily: 'Inter-Regular',
        fontSize: ({h3FontSize}) => h3FontSize,
        fontWeight: '500',
        color: ({textColor}) => textColor,
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            fontSize: ({h3FontSizeMobile}) => h3FontSizeMobile,
        }
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
        [theme.breakpoints.down('sm')]: {
            width: '100px',
            height: '100px',
        }
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
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            gap: '10px',
        }
    },
    textContainer: {
        width: '100%',
    },
    name: {
        fontFamily: 'Inter-Regular',
        fontSize: ({h3FontSize}) => h3FontSize,
        fontWeight: 700,
        color: ({textColor}) => textColor,
        [theme.breakpoints.down('sm')]: {
            fontSize: ({h3FontSizeMobile}) => h3FontSizeMobile,

        }
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
        [theme.breakpoints.down('sm')]: {
            paddingRight: '0',
            borderBottom: 'none'
        }

    },
    aboutPaymentSection: {
      paddingRight: '20px',
      margin: '20px 0 50px 0',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        }
    },
    paymentSystem: {
      display: 'flex',
        flexDirection: 'row',
        gap: '20px',
    },
    aboutPaymentTitle: {
      fontFamily: 'Inter-Regular',
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
        color: ({textColor}) => textColor,
        [theme.breakpoints.down('sm')]: {
            fontSize: ({descriptionTextFontSizeMobile}) => descriptionTextFontSizeMobile,

        }
    },
    priceSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        paddingLeft: '20px',
        borderLeft: '1px solid #E5E5E5',
        [theme.breakpoints.down('sm')]: {
            paddingLeft: '0',
            borderLeft: 'none',
            marginBottom: '32px',
        }
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
        fontSize: ({descriptionTextFontSizeMobile}) => descriptionTextFontSizeMobile,
        fontWeight: 700,
        color: ({textColor}) => textColor,
        [theme.breakpoints.down('sm')]: {
            fontSize: ({descriptionTextFontSizeMobile}) => descriptionTextFontSizeMobile,
        }
    },
    summaryPrice: {
        fontFamily: 'Inter-Regular',
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
        color: ({textColor}) => textColor,
        [theme.breakpoints.down('sm')]: {
            fontSize: ({descriptionTextFontSizeMobile}) => descriptionTextFontSizeMobile,

        }
    },
    settingsProductButtonSection: {
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'flex-end',
        }

    }
}));

export default useStyles;