import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '60vw',
        margin: 'auto',
    },
    paper: {
        position: 'relative',
        backgroundColor: ({backgroundColor}) => backgroundColor,
        boxShadow: 'none',
        padding: '20px 20px 30px 20px',
        borderRadius: '16px',
    },
    closeButton: {},
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
        fontSize: '24px',
        fontWeight: '500',
        color: ({textColor}) => textColor,
        textAlign: 'center',
        marginBottom: '20px',
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
        fontSize: '16px',
        fontWeight: '700',
        color: ({textColor}) => textColor,
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
        fontSize: '14px',
        fontWeight: '400',
        color: ({textColor}) => textColor,
    },
    priceInfo: {
        fontFamily: 'Inter-Regular',
        fontSize: '16px',
        fontWeight: '700',
        color: ({textColor}) => textColor,
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
    },
    propossalText: {
        fontFamily: 'Inter-Regular',
        fontSize: '18px',
        fontWeight: '700',
        color: ({textColor}) => textColor,
    }
}));

export default useStyles;