import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles} from '@material-ui/core/styles';
import Logo from "../../../assets/Logo/LOGO.svg";
import {Box} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useTheme} from "../../../theme/themeContext";
import {themes} from "../../../theme/themeContext/themes";
import {ReactComponent as WCAGIcon} from "../../../assets/Icons/wcag-logo.svg";
import SettingsDrawer from "../../UI/WCAGDrawer";
import ToggleMenu from "../ToggleMenu";
import FloatingButton from "../../UI/FloatingButton";


const navLinksData = [
    {
        url: '/o-fundacji',
        text: 'O fundacji',
        subLinks: [
            { url: '/o-fundacji/misja', text: 'Misja' },
            { url: '/o-fundacji/historia', text: 'Historia' },
        ],
    },
    {
        url: '/projekty',
        text: 'Projekty',
        subLinks: [
            { url: '/projekty/projekt-1', text: 'Projekt 1' },
            { url: '/projekty/projekt-2', text: 'Projekt 2' },
        ],
    },
    {
        url: '/aktualnosci',
        text: 'Aktualności',
        subLinks: [
            { url: '/aktualnosci/wydarzenie-1', text: 'Wydarzenie 1' },
            { url: '/aktualnosci/wydarzenie-2', text: 'Wydarzenie 2' },
        ],
    },
    { url: 'https://turystykabezfiltrow.com/', text: 'Blog', subLinks: [] },
    {
        url: 'https://turystykabezfiltrow.com/wycieczki/',
        text: 'Wycieczki',
        subLinks: [
            { url: 'https://turystykabezfiltrow.com/wycieczki/wycieczka-1', text: 'Wycieczka 1' },
            { url: 'https://turystykabezfiltrow.com/wycieczki/wycieczka-2', text: 'Wycieczka 2' },
        ],
    },
    { url: '/kontakt', text: 'Kontakt', subLinks: [] },
];

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: ({backgroundColor}) => backgroundColor,
        boxShadow: 'none',
        transition: "all 0.3s ease-out",
        borderRadius: '10px',
        margin: '20px',
        width: 'calc(100% - 40px)',
    },
    // hidden: {
    //     transform: "translate(0, -100%)",
    // },
    menuButton: {
        marginRight: 10,
    },
    toolbar: {
        padding: '20px',
        [theme.breakpoints.down('sm')]: {
            padding: '10px 20px',
            display: 'flex',
            justifyContent: 'space-between',
        },
        [theme.breakpoints.up('lg')]: {
            padding: '20px'
        },
        [theme.breakpoints.up('xl')]: {
            padding: '20px 40px'
        }
    },
    title: {
        flexGrow: 1,
        textAlign: 'center',

        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    buttonWrapper: {
        display: 'flex',
        //alignItems: 'center',
        flexDirection: 'row',
        gap: '20px',
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
    },
    navButton: {
        color: ({postsTextColor}) => postsTextColor,
        transition: "all 0.3s ease-out",
        textDecoration: 'none',
        fontSize: '20px',
        fontFamily: 'Helvetica-Regular',
        textTransform: 'none',
        fontWeight: 400,
        lineHeight: '27.6px',
        padding: '10px',
        '&:hover': {
            backgroundColor: 'transparent',
            color: ({postsHoverTextColor}) => postsHoverTextColor,
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
    },
    wcagButton: {
        border: 'none',
        background: WCAGIcon,
        backgroundColor: 'transparent',
        cursor: 'pointer',
        "& path": {
            transition: '300ms ease-in-out',
            fill: ({iconColorFill}) => iconColorFill,
        },
        '&:hover': {
            "& path": {
                transition: '300ms ease-in-out',
                fill: ({iconColorFillHover}) => iconColorFillHover,
            },
        },
    },
    link: {
        textDecoration: 'none',
        "& path": {
            transition: '300ms ease-in-out',
            fill: ({iconColorFill}) => iconColorFill,
        },
        '&:hover': {
            "& path": {
                transition: '300ms ease-in-out',
                fill: ({iconColorFillHover}) => iconColorFillHover,
            },
        },
    },
    mobileButtonSection: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            flexDirection: 'row',
            gap: '32px',
        }
    }
}));

function Header() {
    // eslint-disable-next-line no-unused-vars
    const {theme, toggleTheme} = useTheme();
    const classes = useStyles(themes[theme]);

    return (
        <AppBar position={'fixed'} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <a href={'/'}>
                    <img src={Logo} alt="logo" className={classes.logo}/>
                </a>
                <Box className={classes.title}>
                    {/*{navLinksData.map((link) => (*/}
                    {/*    <Link*/}
                    {/*        key={link.url}*/}
                    {/*        to={link.url}*/}
                    {/*        className={classes.navButton}*/}
                    {/*    >*/}
                    {/*        {link.text}*/}
                    {/*    </Link>*/}
                    {/*))}*/}
                    {/*    тут нужен твой код кнопок навигации*/}
                </Box>
                <Box className={classes.buttonWrapper}>
                    <Box>
                        <SettingsDrawer/>
                    </Box>
                </Box>
                <FloatingButton />
                <Box className={classes.mobileButtonSection}>
                    <SettingsDrawer/>
                    <ToggleMenu/>
                </Box>

            </Toolbar>
        </AppBar>
    );
}

export default Header;

