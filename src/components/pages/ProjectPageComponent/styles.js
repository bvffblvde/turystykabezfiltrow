import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '60px',
        marginBottom: '0',
        [theme.breakpoints.down('sm')]: {
            marginTop: '41px',
            marginBottom: '0px',
        }
    },
    title: {
        fontFamily: 'Inter-Regular',
        fontSize: ({h2FontSize}) => h2FontSize,
        fontWeight: 500,
        color: ({textColor}) => textColor,
        marginBottom: '12px',
        [theme.breakpoints.down('sm')]: {
            fontSize: ({h2FontSizeMobile}) => h2FontSizeMobile,
            fontWeight: 700,
            marginBottom: '10px',
        },
    },
    description: {
        fontFamily: 'Inter-Regular',
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
        fontWeight: 400,
        padding: '0 10px 0 0',
        color: ({textColor}) => textColor,
        '& p': {
            margin: '0 0 20px 0',
            wordBreak: 'auto-phrase',
        },
        '& p.has-background': {
            color: ({textColor}) => textColor,
            borderRadius: '6px',
            padding: '20px',
            marginRight: '10px',
            backgroundColor: '#90AFFF !important',
            '& a': {
                color: ({useLocationLinkColor}) => useLocationLinkColor,
                '&:hover': {
                    color: ({darkHoverButtonTextColor}) => darkHoverButtonTextColor,
                }
            },
            [theme.breakpoints.down('sm')]: {
                padding: '10px',
                margin: '0',
            },
        },
        // '& p.has-background': {
        //     backgroundColor: 'transparent !important',
        // },
        '& a': {
            transition: "all 0.5s ease-out",
            color: ({useLocationLinkColor}) => useLocationLinkColor,
            '&:hover': {
                transition: "all 0.5s ease-out",
                color: ({useLocationLinkColorHover}) => useLocationLinkColorHover,
            }
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: ({descriptionTextFontSizeMobile}) => descriptionTextFontSizeMobile,
        }
    },
    date: {
        fontFamily: 'Inter-Regular',
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
        fontWeight: 400,
        opacity: '0.6',
        color: ({textColor}) => textColor,
        marginBottom: '20px',
        [theme.breakpoints.down('sm')]: {
            fontSize: ({descriptionTextFontSizeMobile}) => descriptionTextFontSizeMobile,
            marginBottom: '20px',
        },
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        position: 'relative',
        '& img': {
            width: '100%',
            maxHeight: '700px',
            borderRadius: '0',
            objectFit: 'cover',
            aspectRatio: '3/4',
            listStyle: 'none',
            paddingLeft: 0,
            //cursor: 'pointer',
            transition: 'transform 0.3s ease-in-out',
        },
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '16px',
        '& figure': {
            margin: '0',
            width: '100%',
            height: '100%',
        }
    },
    imageMobile: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            width: '100%',
            height: 'auto',
            //cursor: 'pointer',
            marginBottom: '20px',
            '& figure': {
                margin: '0',
                width: '100%',
                height: '100%',
            },
        }
    },
    textContainer: {
        width: '100%',
        hyphens: 'auto',
        wordWrap: 'break-word',
        '& ul': {
            textDecoration: 'none',
            listStyle: 'none',
            padding: '0',
        },
        '& figure': {
            display: 'none',
        }
    },
    contentWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        paddingBottom: '0',
    },
    facebookStyleImage: {
        width: '100%',
        height: '100%',
        marginBottom: '0',
        borderRadius: '12px',
        objectFit: 'cover',
        objectPosition: 'center',
        //todo comment this
        //aspectRatio: '3/4',
        cursor: 'pointer',
        listStyle: 'none',
        paddingLeft: 0,
        transition: 'transform 0.3s ease-in-out',
    },
    facebookStyleImageAlternative: {
        height: '100%',
        aspectRatio: '3/2',
        [theme.breakpoints.down('sm')]: {
            aspectRatio: '3/4',
        }
    },
    facebookStyleImageLarge: {
        width: '100%',
        height: '100%',
        borderRadius: '12px',
        objectFit: 'cover',
        aspectRatio: '3/4',
        cursor: 'pointer',
        listStyle: 'none',
        paddingLeft: 0,
        transition: 'transform 0.3s ease-in-out',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    columnsWithTwoImages: {
        width: '25%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        [theme.breakpoints.down('sm')]: {
            width: '50%',
        }
    },
    columnsWithTwoImagesAlternative: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        [theme.breakpoints.down('sm')]: {
            width: '50%',
        }
    },
    columnsWithOneImage: {
        width: '50%',
        [theme.breakpoints.down('sm')]: {
            width: 'unset',
            display: 'none',
        }
    },
    columnsWrapper: {
        //todo change this
        //height: '75vh',
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        padding: '0 10px 0 0',
        marginBottom: '20px',
        width: '100%',
        [theme.breakpoints.down('sm')]: {
            padding: '0px',
            marginBottom: '10px',
        },
        '& figure': {
            margin: '0',
            height: '100%',
        },
        '& img': {
            width: '100%',
            borderRadius: '12px',
            height: '100%',
            objectFit: 'cover',

        }
    },
    viewAllButton: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        color: ({bannerTextColor}) => bannerTextColor,
        width: '100%',
        height: '100%',
        borderRadius: '12px',
        position: 'absolute',
        top: '50%',
        fontFamily: 'Inter-Bold',
        fontSize: ({h2FontSize}) => h2FontSize,
        fontWeight: 700,
        textTransform: 'none',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 1,
        padding: '10px 20px',
        '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: ({h2FontSizeMobile}) => h2FontSizeMobile,
        }
    },
    textWrapper: {
        width: '65%',
        borderRight: '1px solid',
        borderColor: ({borderColor}) => borderColor,
        [theme.breakpoints.down('sm')]: {
            borderRight: 'none',
            width: '100%',
        }
    },
    imageWrapper: {
        width: '35%',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
    },
    fullWidth: {
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    },
    largeActiveViewForMobile: {
        [theme.breakpoints.down('sm')]: {
            display: 'block',
        }
    },
    downloadButtonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '20px',
        margin: '20px 0 20px 0',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        }
    },
    twoImagesBoxView: {
        aspectRatio: '3/1',
        [theme.breakpoints.down('sm')]: {
            aspectRatio: 'unset',
        }
    },
    descriptionContainer: {
        padding: '20px 10px 0 0',
        [theme.breakpoints.down('sm')]: {
            padding: '20px 0 0 0',
        }
    },
    nextSectionWrapper: {
        marginTop: '60px',
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        [theme.breakpoints.down('sm')]: {
            gap: '20px',
            marginTop: '40px',
        }
    },
    titleNextInSection: {
        fontFamily: 'Inter-Regular',
        fontSize: ({h2FontSize}) => h2FontSize,
        fontWeight: 500,
        color: ({textColor}) => textColor,
        [theme.breakpoints.down('sm')]: {
            fontSize: ({h2FontSizeMobile}) => h2FontSizeMobile,
        }
    },

}));

export default useStyles;