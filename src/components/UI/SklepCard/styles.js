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
    textContainer: {
        flex: 1,
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
    linkWrapper: {
        textDecoration: 'none',
        color: 'inherit', // Унаследовать цвет из родительского элемента
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
        fontFamily: 'Inter-Regular',
        transition: "all 0.3s ease-out",
        color: ({textColor}) => textColor,
        fontSize: '16px',
        marginBottom: '12px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '14px',
            marginBottom: '10px',
        }
    },
    price: {
        fontFamily: 'Inter-Regular',
        fontSize: '20px',
        fontWeight: '500',
        color: ({textColor}) => textColor,
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default useStyles;

