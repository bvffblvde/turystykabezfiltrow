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
        url: '/bydgoszcz',
        text: 'Bydgoszcz',
        subLinks: [
            {url: '/o-fundacji/misja', text: 'BYDGOSZCZ PRZEZ DZIURKĘ OD KLUCZA'},
            {url: '/o-fundacji/historia', text: 'BYDGOSKIE OSIEDLA BEZ FILTRÓW'},
            {url: '/o-fundacji/historia', text: 'BYDGOSZCZ – NARODZONA Z WODY'},
            {url: '/o-fundacji/historia', text: 'CUDA BYDGOSKIE'},
            {url: '/o-fundacji/historia', text: 'INNE BYDGOSKIE'},
            {url: '/o-fundacji/historia', text: 'SZLAKIEM BYDGOSKICH OSIEDLI #1 – BARTODZIEJE'},

        ],
    },
    {
        url: '/regiony',
        text: 'Regiony',
        subLinks: [
            {url: '/projekty/projekt-1', text: 'WŁOCŁAWEK'},
            {url: '/projekty/projekt-2', text: 'INOWROCŁAW'},
            {url: '/projekty/projekt-1', text: 'KRAKÓW'},
            {url: '/projekty/projekt-2', text: 'SZCZECIN'},
            {url: '/projekty/projekt-1', text: 'GRUDZIĄDZ'},
            {url: '/projekty/projekt-2', text: 'CHOJNICE I OKOLICE'},
            {url: '/projekty/projekt-1', text: 'GÓRY SOWIE'},
        ],
    },
    {
        url: '/kraje',
        text: 'Kraje',
        subLinks: [
            {url: '/aktualnosci/wydarzenie-1', text: 'UKRAINA'},
            {url: '/aktualnosci/wydarzenie-2', text: 'NIEMCY'},
        ],
    },
    {
        url: '/o-nas',
        text: 'O nas',
        subLinks: [
            {url: 'https://turystykabezfiltrow.com/wycieczki/wycieczka-1', text: 'BEZ FILTRÓW - czyli?'},
            {url: 'https://turystykabezfiltrow.com/wycieczki/wycieczka-2', text: 'Wesprzyj nas!'},
            {url: 'https://turystykabezfiltrow.com/wycieczki/wycieczka-2', text: 'Wydarzenia'},
            {url: 'https://turystykabezfiltrow.com/wycieczki/wycieczka-2', text: 'Projekty'},
            {url: 'https://turystykabezfiltrow.com/wycieczki/wycieczka-2', text: 'Wydawnictwa'},

        ],
    },
    {
        url: '/filmy',
        text: 'Filmy',
        // subLinks: [
        //     {url: 'https://turystykabezfiltrow.com/wycieczki/wycieczka-1', text: 'Bydgoszcz?'},
        //     {url: 'https://turystykabezfiltrow.com/wycieczki/wycieczka-1', text: 'Dzieje się !'},
        //     {url: 'https://turystykabezfiltrow.com/wycieczki/wycieczka-1', text: 'Szlak Piastowski'},
        //     {url: 'https://turystykabezfiltrow.com/wycieczki/wycieczka-1', text: 'Żnin BEZ FILTRÓW'},
        //     {url: 'https://turystykabezfiltrow.com/wycieczki/wycieczka-1', text: 'Bydgoscy Avengersi'},
        //
        // ],
    },
    // {
    //     url: 'https://turystykabezfiltrow.com/wycieczki/',
    //     text: 'Sklep',
    // },
    {
        url: 'https://pisanieiprojekty.com/',
        text: 'Firma P&P',
    },
    {
        url: '/wez-udzial',
        text: 'WEŹ UDZIAŁ',
    },
    {
        url: 'https://turystykabezfiltrow.com/wycieczki/',
        text: 'Wesprzyj nas!',
    },
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
        justifyContent: 'space-between',
        display: 'flex',
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
    navButtonsWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
    },
    navButton: {
        color: ({postsTextColor}) => postsTextColor,
        transition: "all 0.3s ease-out",
        textDecoration: 'none',
        fontSize: '16px',
        fontFamily: 'Inter-Regular',
        textTransform: 'Uppercase',
        fontWeight: 500,
        padding: '0',

        '&:hover': {
            backgroundColor: 'transparent',
            color: ({postsHoverTextColor}) => postsHoverTextColor,
        },
        '&:hover $subMenu': {
            display: 'flex',
        },
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
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
        color: 'inherit',
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
    },
    subMenu: {
        display: 'none',
        position: 'absolute',
        flexDirection: 'column',
        gap: '10px',
        backgroundColor: ({backgroundColor}) => backgroundColor,
        borderRadius: '8px',
        boxShadow: 'none',
        zIndex: 1,
        minWidth: '160px',
        paddingTop: '30px',
        textTransform: 'capitalize',
        transition: "all 0.3s ease-out",
        '& a': {
            textAlign: 'left',
            padding: '5px 10px 5px 10px',
            textTransform: 'capitalize',
            textDecoration: 'none',
            transition: "all 0.3s ease-out",
            color: ({postsTextColor}) => postsTextColor,
            '&:hover': {
                transition: "all 0.3s ease-out",
                backgroundColor: '#f5f5f5',  // Цвет фона при наведении на подпункт
                color: ({postsHoverTextColor}) => postsHoverTextColor,
            },
        },
    },
    line: {
        height: '2px',
        width: '50%',
        backgroundColor: ({lineBackgroundColor}) => lineBackgroundColor,
    }
}));

function Header() {
    // eslint-disable-next-line no-unused-vars
    const {theme, toggleTheme} = useTheme();
    const classes = useStyles(themes[theme]);

    return (
        <AppBar position={'fixed'} className={classes.appBar}>
            <Toolbar className={classes.toolbar}>
                <Box>
                    <a href={'/'}>
                        <img src={Logo} alt="logo" className={classes.logo}/>
                    </a>
                </Box>
                <Box className={classes.title}>
                    <Box className={classes.navButtonsWrapper}>
                        {navLinksData.map((navLink, index) => (
                            <Box
                                key={index}
                                className={classes.navButton}
                                onMouseEnter={(e) => e.currentTarget.classList.add('hovered')}
                                onMouseLeave={(e) => e.currentTarget.classList.remove('hovered')}
                            >
                                <Link to={navLink.url} className={classes.link}>
                                    {navLink.text}
                                </Link>
                                {navLink.subLinks && navLink.subLinks.length > 0 && (
                                    <Box className={classes.subMenu}>
                                        <div className={classes.line}/>
                                        {navLink.subLinks.map((subLink, subIndex) => (
                                            <Link key={subIndex} to={subLink.url} className={classes.link}>
                                                {subLink.text}
                                            </Link>
                                        ))}
                                    </Box>
                                )}
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Box className={classes.buttonWrapper}>
                    <Box>
                        <SettingsDrawer/>
                    </Box>
                </Box>
                <FloatingButton/>
                <Box className={classes.mobileButtonSection}>
                    <SettingsDrawer/>
                    <ToggleMenu/>
                </Box>

            </Toolbar>
        </AppBar>
    );
}

export default Header;

