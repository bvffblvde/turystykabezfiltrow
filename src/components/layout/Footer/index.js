import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {useTheme} from "../../../theme/themeContext";
import {themes} from "../../../theme/themeContext/themes";
import {Box} from "@material-ui/core";
import {Link} from "react-router-dom";
// import {ReactComponent as FaceBookLogo} from "../../../assets/Icons/facebook-logo.svg";
// import {ReactComponent as InstagramLogo} from "../../../assets/Icons/inst-logo.svg";
// import {ReactComponent as LinkedinLogo} from "../../../assets/Icons/linkedin-logo.svg";

const useStyles = makeStyles((theme) => ({
    root: {
        //flexGrow: 1,
        color: ({footerTextColor}) => footerTextColor,
        display: "flex",
        flexWrap: "wrap",
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
        backgroundColor: ({footerBackgroundColor}) => footerBackgroundColor,
        padding: '40px 20px 40px 20px',
        transition: "all 0.3s ease-out",
        [theme.breakpoints.down('sm')]: {
            padding: '40px 20px 40px 20px'
        },
        [theme.breakpoints.up('lg')]: {
            padding: '40px 20px 40px 20px'
        },
        [theme.breakpoints.up('xl')]: {
            padding: '40px 20px 40px 20px'
        },
    },
    linkText: {
        fontFamily: 'Helvetica-Regular',
        fontSize: '24px',
        fontWeight: '400',
        marginBottom: '10px',
        color: ({footerTextColor}) => footerTextColor,
        transition: "all 0.3s ease-out",
        '&:hover': {
            color: ({footerTextColorHover}) => footerTextColorHover,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: '18px',
            marginBottom: '6px',
        }
    },
    link: {
        textDecoration: 'none',
        color: ({footerTextColor}) => footerTextColor,
        '&:hover': {
            textDecoration: 'none',
        }
    },
    linkSocial: {
        textDecoration: 'none',
        "& path": {
            transition: '300ms ease-in-out',
            fill: ({footerTextColor}) => footerTextColor,
        },
        '&:hover': {
            "& path": {
                transition: '300ms ease-in-out',
                fill: ({footerTextColorHover}) => footerTextColorHover,
            },
        },
    },
    titleText: {
        fontFamily: 'Helvetica-Bold',
        fontSize: '20px',
        fontWeight: '700',
        transition: "all 0.3s ease-out",
        color: ({footerTextColor}) => footerTextColor,
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
        }
    },
    descriptionText: {
        fontFamily: 'Helvetica-Regular',
        fontSize: '20px',
        fontWeight: '400',
        transition: "all 0.3s ease-out",
        color: ({footerTextColor}) => footerTextColor,
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
        }
    },
    boxWrapper: {
        marginBottom: '20px',
    },
    otherText: {
        marginBottom: '12px',
        textDecoration: 'none',
        '&:hover': {
            color: ({footerTextColorHover}) => footerTextColorHover,
        }
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
    },
}));
// eslint-disable-next-line no-unused-vars
const LinkText = ({text, to}) => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);

    return (
        <Link to={to} className={classes.link}>
            <Typography className={classes.linkText}>{text}</Typography>
        </Link>
    );
}


function Footer() {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);

    return (
        <Box className={classes.footerWrapper}>
            {/*<div className={classes.root}>*/}
            {/*    <Box>*/}
            {/*        <LinkText text="O fundacji" to="/o-fundacji"/>*/}
            {/*        <LinkText text="Projekty" to="/projekty"/>*/}
            {/*        <LinkText text="Aktualności" to="/aktualnosci"/>*/}
            {/*        <LinkText text="Blog" to="/blog"/>*/}
            {/*        <LinkText text="Wycieczki " to="/wycieczki"/>*/}
            {/*    </Box>*/}
            {/*    <Box>*/}
            {/*        <Box className={classes.boxWrapper}>*/}
            {/*            <Typography className={classes.titleText}>Fundacja Krzewienia Kultury i Turystyki „Nad*/}
            {/*                Rzeką”*/}
            {/*            </Typography>*/}
            {/*            <Typography className={classes.descriptionText}>Bartosza Głowackiego 41 / 32,</Typography>*/}
            {/*            <Typography className={classes.descriptionText}>85-717 Bydgoszcz, Polska</Typography>*/}
            {/*        </Box>*/}
            {/*        <Box className={classes.boxWrapper}>*/}
            {/*            <Typography className={classes.titleText}>Inne Dane</Typography>*/}
            {/*            <Typography className={classes.descriptionText}>KRS: 0000852796</Typography>*/}
            {/*            <Typography className={classes.descriptionText}>NIP: 5542986945</Typography>*/}
            {/*            <Typography className={classes.descriptionText}>REGON: 386662360</Typography>*/}
            {/*        </Box>*/}
            {/*    </Box>*/}
            {/*    <Box>*/}
            {/*        <Box className={classes.boxWrapper}>*/}
            {/*            <Typography className={classes.titleText}>Tel:</Typography>*/}
            {/*            <Typography className={classes.descriptionText}>+48 00 555 11 33</Typography>*/}
            {/*            <Typography className={classes.descriptionText}>+48 11 113 33 22</Typography>*/}
            {/*        </Box>*/}
            {/*        <Box className={classes.boxWrapper}>*/}
            {/*            <Typography className={classes.titleText}>E-mail:</Typography>*/}
            {/*            <Typography className={classes.descriptionText}>fundacja.nadrzeka@gmail.com</Typography>*/}
            {/*        </Box>*/}
            {/*        <Box className={classes.buttonWrapper}>*/}
            {/*            <Link to={'https://www.facebook.com/FundacjaNadRzeka/'} className={classes.linkSocial}>*/}
            {/*                <Icon*/}
            {/*                    component={FaceBookLogo}*/}
            {/*                    className={classes.icon}*/}
            {/*                    src={FaceBookLogo}*/}
            {/*                />*/}
            {/*            </Link>*/}
            {/*            <Link*/}
            {/*                to={'https://www.linkedin.com/company/fundacja-krzewienia-kultury-i-turystyki-nad-rzek%C4%85/'}*/}
            {/*                className={classes.linkSocial}>*/}
            {/*                <Icon*/}
            {/*                    component={LinkedinLogo}*/}
            {/*                    className={classes.icon}*/}
            {/*                    src={LinkedinLogo}*/}
            {/*                />*/}
            {/*            </Link>*/}
            {/*            <Link to={'https://www.instagram.com/fundacja.nad_rzeka?igshid=YmMyMTA2M2Y%3D'}*/}
            {/*                  className={classes.linkSocial}>*/}
            {/*                <Icon*/}
            {/*                    component={InstagramLogo}*/}
            {/*                    className={classes.icon}*/}
            {/*                    src={InstagramLogo}*/}
            {/*                />*/}
            {/*            </Link>*/}
            {/*        </Box>*/}
            {/*    </Box>*/}
            {/*    <Box style={{display: 'flex', flexDirection: 'column'}}>*/}
            {/*        <Link to="/" className={classes.descriptionText + ' ' + classes.otherText}>*/}
            {/*            Polityka prywatności*/}
            {/*        </Link>*/}
            {/*        <Link to="/declaracja-dostepnosci" className={classes.descriptionText + ' ' + classes.otherText}>*/}
            {/*            Deklaracja dostępności*/}
            {/*        </Link>*/}
            {/*    </Box>*/}
            {/*</div>*/}
        </Box>
    );
}

export default Footer;

