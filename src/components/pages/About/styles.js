import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    boxWrapper: {
        display: 'flex',
        gap: '5%',
    },
    sideBarSection: {
        //paddingTop: '100px',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        gap: '80px',
        padding: '0 5% 0 calc(5% + 40px)',
        borderLeft: '1px solid',
        borderColor: ({borderColorForAboutPage}) => borderColorForAboutPage,
        [theme.breakpoints.down('sm')]: {
            padding: '0',
            border: 'none',
            marginBottom: '60px',
            gap: '40px'
        },
    },
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: ({titleSectionFontSize}) => titleSectionFontSize,
        fontWeight: 700,
        textAlign: "center",
        color: ({textColor}) => textColor,
        marginBottom: '32px',
        [theme.breakpoints.down('sm')]: {
            fontSize: ({titleSectionFontSizeMobile}) => titleSectionFontSizeMobile,
            fontWeight: 700,
            marginBottom: '16px',
        },
    },
    subTitle: {
        fontFamily: 'Inter-Regular',
        fontSize: ({h4FontSize}) => h4FontSize,
        fontWeight: 400,
        textAlign: "center",
        color: ({textColor}) => textColor,
        marginBottom: '40px',
        width: '80%',
        [theme.breakpoints.down('sm')]: {
            fontSize: ({h4FontSizeMobile}) => h4FontSizeMobile,
            width: '100%',
            marginBottom: '16px',
        }
    },
    subTextBlock: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    banner: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        marginBottom: '20px',
    },
    bannerContainer: {
        width: 'calc(100% + 40px)',
        height: '60vh',
        //padding: '20px',
        boxSizing: 'border-box',
        //marginBottom: '100px',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '30vh',
        }
    },
    titleBlock: {
        fontFamily: 'Inter-Bold',
        fontSize: ({h2FontSize}) => h2FontSize,
        fontWeight: 500,
        marginBottom: '20px',
        color: ({aboutPageTextTitleColor}) => aboutPageTextTitleColor,
        [theme.breakpoints.down('sm')]: {
            fontSize: ({h2FontSizeMobile}) => h2FontSizeMobile,
            marginBottom: '20px',
        }
    },
    titleBlockFirst: {
        fontFamily: 'Inter-Regular',
        fontSize: ({h2FontSize}) => h2FontSize,
        fontWeight: 400,
        marginBottom: '20px',
        color: ({aboutPageTextTitleColor}) => aboutPageTextTitleColor,
        [theme.breakpoints.down('sm')]: {
            fontSize: ({h2FontSizeMobile}) => h2FontSizeMobile,
        }
    },
    descriptionText: {
        fontFamily: 'Inter-Regular',
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
        fontWeight: 400,
        color: ({textColor}) => textColor,
        '& p': {
            margin: '0 0 10px 0',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: ({descriptionTextFontSizeMobile}) => descriptionTextFontSizeMobile,

        }
    },
    individualPhoto: {
        width: '100%',
        aspectRatio: '1/1',
        borderRadius: '10px',
        objectFit: 'cover',
    },
    boldText: {
        fontFamily: 'Inter-Regular',
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
        fontWeight: 700,
        color: ({textColor}) => textColor,
        marginBottom: '10px',
        [theme.breakpoints.down('sm')]: {
            fontSize: ({descriptionTextFontSizeMobile}) => descriptionTextFontSizeMobile,
        }
    },
    descriptionForZespol: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    gridWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: '40px',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            gap: '20px',
        }
    },
    zespolContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
    },
    rightBlock: {
        //paddingTop: '100px',
        [theme.breakpoints.down('sm')]: {
            //paddingTop: '20px',
        }
    },
    descriptionStartSection: {
        fontFamily: 'Inter-Regular',
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
        fontWeight: 400,
        color: ({textColor}) => textColor,
        '& p': {
            margin: '0 0 10px 0',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: ({descriptionTextFontSizeMobile}) => descriptionTextFontSizeMobile,

        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default useStyles;