import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60vw',
        margin: 'auto',
        [theme.breakpoints.down('sm')]: {
            width: '100vw',
            height: '100vh',
        }
    },
    paper: {
        position: 'relative',
        backgroundColor: ({backgroundColor}) => backgroundColor,
        boxShadow: 'none',
        padding: '20px 20px 30px 20px',
        borderRadius: '16px',
        [theme.breakpoints.down('sm')]: {
            borderRadius: '0',
            padding: '20px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
        }
    },
    headerModal: {
        display: 'flex',
        justifyContent: 'flex-end',
        '& button': {
            color: ({textColor}) => textColor,
            padding: '0',
            opacity: '0.5',
            transition: 'all 0.3s ease-out',
            '&:hover': {
                opacity: '1',
            }
        }
    },
    modalTitle: {
        fontFamily: 'Inter-Regular',
        fontSize: ({h3FontSize}) => h3FontSize,
        fontWeight: '500',
        color: ({textColor}) => textColor,
        textAlign: 'center',
        marginBottom: '20px',
        [theme.breakpoints.down('sm')]: {
            fontSize: ({h3FontSizeMobile}) => h3FontSizeMobile,
        }
    },
    infoAboutSelectProduct: {
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        marginBottom: '32px',
    },
    image: {
        width: '100px',
        height: '110px',
        objectFit: 'cover',
        borderRadius: '10px',
    },
    nameProduct: {
        fontFamily: 'Inter-Regular',
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
        fontWeight: '700',
        color: ({textColor}) => textColor,
        [theme.breakpoints.down('sm')]: {
            fontSize: ({descriptionTextFontSizeMobile}) => descriptionTextFontSizeMobile,
        }
    },
    textInfoAboutProductWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    circleColor: {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        border: '1px solid',
        borderColor: ({textColor}) => textColor,
    },
    colorAndSizeInfoText: {
        fontFamily: 'Inter-Regular',
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
        fontWeight: '400',
        color: ({textColor}) => textColor,
        [theme.breakpoints.down('sm')]: {
            fontSize: ({descriptionTextFontSizeMobile}) => descriptionTextFontSizeMobile,
        }
    },
    priceInfo: {
        fontFamily: 'Inter-Regular',
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
        fontWeight: '700',
        color: ({textColor}) => textColor,
        [theme.breakpoints.down('sm')]: {
            fontSize: ({descriptionTextFontSizeMobile}) => descriptionTextFontSizeMobile,
        }
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        marginBottom: '20px',
    },
    propossal: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
    },
    propossalText: {
        fontFamily: 'Inter-Regular',
        fontSize: ({h4FontSize}) => h4FontSize,
        fontWeight: '700',
        color: ({textColor}) => textColor,
        [theme.breakpoints.down('sm')]: {
            fontSize: ({h4FontSizeMobile}) => h4FontSizeMobile,
        }
    }
}));

export default useStyles;