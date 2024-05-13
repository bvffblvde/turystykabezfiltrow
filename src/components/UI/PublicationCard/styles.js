import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: ({backgroundColor}) => backgroundColor,
        color: ({textColor}) => textColor,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
        padding: '10px 10px 20px 10px',
        boxShadow: '0px 0px 16px 0px #0000000f',
        transition: "all 0.5s ease-out",
        borderRadius: '16px',
    },
    textContainer: {
        flex: 1,
    },
    image: {
        width: '100%',
        height: '100%',
        aspectRatio: '16/9',
        objectFit: 'cover',
        objectPosition: 'center',
        borderRadius: '16px',
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
    date: {
        fontFamily: 'Inter-Regular',
        fontSize: '16px',
        fontWeight: '400',
        opacity: '0.6',
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px',
        }
    },
    //TODO: refactor
    cardWrapper: {
        marginBottom: '6px',
    },
    linkWrapper: {
        textDecoration: 'none',
        color: 'inherit',
    },
    description: {
        fontFamily: 'Inter-Regular',
        fontSize: '16px',
        fontWeight: '400',
        lineClamp: 4,
        boxOrient: 'vertical',
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginBottom: '32px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
            marginBottom: '16px',
        }
    },
    mainTitle: {
        lineClamp: 2,
        boxOrient: 'vertical',
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    },
    content: {
        padding: '0',
        fontFamily: 'Inter-Regular',
        fontSize: '16px',
        fontWeight: '400',
        lineClamp: 4,
        boxOrient: 'vertical',
        display: '-webkit-box',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        marginBottom: '32px',
        color: ({textColor}) => textColor,
    }
}));

export default useStyles;