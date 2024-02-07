import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        //flexGrow: 1,
        display: "flex",
        width: '65%',
        flexWrap: "wrap",
        rowGap: "40px",
        justifyContent: "space-between",
        [theme.breakpoints.down("sm")]: {
            flexDirection: "column",
            gap: '32px',
        }
    },
    column: {
        padding: theme.spacing(2),
        textAlign: "center",
        [theme.breakpoints.down("xs")]: {
            width: "100%",
        },
        [theme.breakpoints.up("md")]: {
            flexBasis: "20%",
        },
    },
    footerWrapper: {
        backgroundColor: ({backgroundColor}) => backgroundColor,
        padding: '44px 20px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        transition: "all 0.3s ease-out",
        [theme.breakpoints.down('sm')]: {
            padding: '40px 20px 40px 20px'
        },
    },
    linkText: {
        fontFamily: 'Inter-Regular',
        fontSize: '16px',
        fontWeight: 700,
        color: ({postsTextColor}) => postsTextColor,
        marginBottom: '16px',
        textTransform: 'uppercase',
        transition: "all 0.3s ease-out",
        '&:hover': {
            color: ({postsHoverTextColor}) => postsHoverTextColor,
        },
    },
    link: {
        textDecoration: 'none',
        color: ({postsTextColor}) => postsTextColor,
        '&:hover': {
            textDecoration: 'none',
        }
    },
    linkSocial: {
        textDecoration: 'none',
        "& path": {
            transition: '300ms ease-in-out',
            color: ({postsTextColor}) => postsTextColor,
        },
        '&:hover': {
            "& path": {
                transition: '300ms ease-in-out',
                color: ({postsHoverTextColor}) => postsHoverTextColor,
            },
        },
    },
    boxWrapper: {
        marginBottom: '20px',
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    mainSection: {
        width: '25%',
    },
    navWrapper: {
        width: '30%',
    },
    titleLinkSection: {
        fontFamily: 'Inter-Regular',
        fontSize: '16px',
        fontWeight: 400,
        color: ({postsTextColor}) => postsTextColor,
        marginBottom: '12px',
        textTransform: 'capitalize',
        transition: "all 0.3s ease-out",
        '&:hover': {
            color: ({postsHoverTextColor}) => postsHoverTextColor,
        }
    },
    firstButtonSection: {
        marginBottom: '40px',
    }
}));

export default useStyles;