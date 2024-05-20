import React, {useEffect, useState} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {makeStyles} from '@material-ui/core/styles';
import {Box, Icon} from "@material-ui/core";
import {Link} from "react-router-dom";
import {useTheme} from "../../../theme/themeContext";
import {themes} from "../../../theme/themeContext/themes";
import {ReactComponent as WCAGIcon} from "../../../assets/Icons/wcag-logo.svg";
import SettingsDrawer from "../../UI/WCAGDrawer";
import ToggleMenu from "../ToggleMenu";
import {ReactComponent as SearchIcon} from "../../../assets/Icons/search.svg";
// import {ReactComponent as BasketIcon} from "../../../assets/Icons/Basket.svg";


const navLinksData = [
    {
        url: '/bydgoszcz',
        text: 'Bydgoszcz',
        subLinks: [
            {url: '/bydgoszcz/cykl-bydgoszcz-przez-dziurke-od-klucza', text: 'BYDGOSZCZ PRZEZ DZIURKĘ OD KLUCZA'},
            {url: '/bydgoszcz/cykl-bydgoskie-osiedla-bez-filtrow', text: 'BYDGOSKIE OSIEDLA BEZ FILTRÓW'},
            {url: '/bydgoszcz/cykl-bydgoszcz-narodzona-z-wody', text: 'BYDGOSZCZ – NARODZONA Z WODY'},
            {url: '/bydgoszcz/cykl-cuda-bydgoskie', text: 'CUDA BYDGOSKIE'},
            {url: '/bydgoszcz/inne-bydgoskie', text: 'INNE BYDGOSKIE'},
            {url: '/aktualnosci/bartodzieje-szlak', text: 'SZLAKIEM BYDGOSKICH OSIEDLI #1 – BARTODZIEJE'},

        ].sort((a, b) => a.text.localeCompare(b.text)),
    },
    {
        url: '/regiony',
        text: 'Regiony',
        subLinks: [
            {url: '/regiony/wloclawek', text: 'WŁOCŁAWEK'},
            {url: '/regiony/inowroclaw', text: 'INOWROCŁAW'},
            {url: '/regiony/krakow', text: 'KRAKÓW'},
            {url: '/regiony/szczecin', text: 'SZCZECIN'},
            {url: '/regiony/grudziadz', text: 'GRUDZIĄDZ'},
            {url: '/regiony/chojnice', text: 'CHOJNICE I OKOLICE'},
            {url: '/regiony/dolnyslask', text: 'GÓRY SOWIE'},
        ].sort((a, b) => a.text.localeCompare(b.text)),
    },
    {
        url: '/kraje',
        text: 'Kraje',
        subLinks: [
            {url: '/kraje/ukraina', text: 'UKRAINA'},
            {url: '/kraje/wycieczkazagraniczna', text: 'NIEMCY'},
        ],
    },
    {
        url: '/filmy',
        text: 'Filmy',
    },
    // {
    //     url: '/sklep',
    //     text: 'Sklep',
    //     subLinks: [
    //         {url: '/sklep/koszyk', text: 'Koszyk'},
    //     ]
    // },
    {
        url: '/wydarzenia',
        text: 'Wydarzenia',
        subLinks: [
            {url: '/wydarzenia', text: 'Weź udział!'},
            {url: '/wycieczki', text: 'Co zrealizowaliśmy?'},
            {
                url: 'https://www.instagram.com/carfortrip_/?fbclid=IwAR0AnzB3bveYLQbilGia_XFBPek4C9zSQop5rmu-Gd8MLlX5FpKx_fnkDTQ',
                text: 'Wycieczki do Gruzji',
                openInNewTab: true,
            },
        ],
    },
    {
        url: '/o-nas',
        text: 'O nas',
        subLinks: [
            {url: '/o-nas', sectionId: 'bez-filtrow', text: 'BEZ FILTRÓW - czyli?'},
            {url: '/o-nas', sectionId: 'projekty', text: 'Projekty'},
            {url: '/o-nas', sectionId: 'publikacje', text: 'Publikacje'},

        ],
    },
    {
        url: 'https://pisanieiprojekty.com/',
        text: 'Firma P&P',
        openInNewTab: true
    },
    {
        //TODO: change url
        url: 'https://patronite.pl/turystykabezfiltrow',
        text: 'Wesprzyj nas!',
        openInNewTab: true
    },
];

const useStyles = makeStyles((theme) => ({
    appBar: {
        backgroundColor: ({backgroundColor}) => backgroundColor,
        boxShadow: 'none',
        transition: "all 1s ease-out",
        borderRadius: '10px',
        margin: '20px',
        width: 'calc(100% - 40px)',
        border: '1px solid',
        position: 'fixed',
        borderColor: ({inputBorderColor}) => inputBorderColor,
    },
    hidden: {
        transform: "translate(0, -120%)",
    },
    hiddenAbsolute: {
      position: 'absolute',
    },
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
            gap: '25px',
            alignItems: 'center',
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
    },
    iconLink: {
        width: '40px',
        height: '40px',
        position: 'relative',
        "& path": {
            transition: '300ms ease-in-out',
            stroke: ({iconColorFill}) => iconColorFill,
        },
        '&:hover': {
            backgroundColor: 'transparent',
            "& path": {
                transition: '300ms ease-in-out',
                stroke: ({iconColorFillHover}) => iconColorFillHover,
            },
        },
    },
    settingsDrawerBox: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
    },
    logo: {
        backgroundImage: ({mainLogo}) => mainLogo,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        width: '158px',
        height: '38px',
    },
    cartItemCount: {
        position: 'absolute',
        bottom: '15px',
        left: '15px',
        backgroundColor: ({postsHoverTextColor}) => postsHoverTextColor,
        borderRadius: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '15px',
        height: '15px',
        color: ({textColor}) => textColor,
        fontSize: '10px',
        fontFamily: 'Inter-Regular',
    }

}));

const Header = React.memo(() => {
    // eslint-disable-next-line no-unused-vars
    const {theme, toggleTheme} = useTheme();
    const classes = useStyles(themes[theme]);
    const [visible, setVisible] = useState(true);
    // eslint-disable-next-line no-unused-vars
    const [scrolled, setScrolled] = useState(false);
    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [cartItemCount, setCartItemCount] = useState(0); // Состояние для количества товаров в корзине

    useEffect(() => {
        // Логика для обновления состояния cartItemCount при загрузке страницы или изменении содержимого корзины
        const storedCartItems = localStorage.getItem('cartItems');
        if (storedCartItems) {
            const parsedCartItems = JSON.parse(storedCartItems);
            setCartItemCount(parsedCartItems.length); // Устанавливаем количество товаров в корзине
        }
    }, []);


    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - 120,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;

            setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
            setPrevScrollPos(currentScrollPos);
            setScrolled(currentScrollPos > 0);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [prevScrollPos, visible]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 600);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <AppBar position={'fixed'} className={`${classes.appBar} ${!visible && classes.hidden} ${isMobile && classes.hiddenAbsolute}`}>
            <Toolbar className={classes.toolbar}>
                <Box>
                    <a href={'/'}>
                        <Box className={classes.logo}/>
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
                                {navLink.subLinks && navLink.subLinks.length > 0 ? (
                                    <React.Fragment>
                                        <Link
                                            to={navLink.url}
                                            className={classes.link}
                                            {...(navLink.openInNewTab && {
                                                target: '_blank',
                                                rel: 'noopener noreferrer',
                                            })}
                                        >
                                            {navLink.text}
                                        </Link>
                                        <Box className={classes.subMenu}>
                                            <div className={classes.line}/>
                                            {navLink.subLinks.map((subLink, subIndex) => (
                                                <Link
                                                    key={subIndex}
                                                    to={subLink.sectionId ? `${subLink.url}#${subLink.sectionId}` : subLink.url} // Проверка наличия sectionId перед добавлением к URL
                                                    onClick={() => subLink.sectionId && scrollToSection(subLink.sectionId)}
                                                    className={classes.link}
                                                    {...(navLink.openInNewTab && {
                                                        target: '_blank',
                                                        rel: 'noopener noreferrer',
                                                    })}
                                                >
                                                    {subLink.text}
                                                </Link>
                                            ))}
                                        </Box>
                                    </React.Fragment>
                                ) : (
                                    <Link
                                        to={navLink.url}
                                        className={classes.link}
                                        onClick={() => navLink.sectionId && scrollToSection(navLink.sectionId)}
                                        {...(navLink.openInNewTab && {
                                            target: '_blank',
                                            rel: 'noopener noreferrer',
                                        })}
                                    >
                                        {navLink.text}
                                    </Link>
                                )}
                            </Box>
                        ))}
                    </Box>
                </Box>
                <Box className={classes.buttonWrapper}>
                    <Box>
                        <Link to="/wyszukiwarka" className={classes.iconLink}>
                            <Icon
                                component={SearchIcon}
                                className={classes.icon}
                                src={SearchIcon}
                            />
                        </Link>
                    </Box>
                    <Box>
                        <SettingsDrawer/>
                    </Box>
                    {/*<Box>*/}
                    {/*    <Link to="/sklep/koszyk" className={classes.iconLink}>*/}
                    {/*        <Icon*/}
                    {/*            component={BasketIcon}*/}
                    {/*            className={classes.icon}*/}
                    {/*            src={BasketIcon}*/}
                    {/*        />*/}
                    {/*        {cartItemCount > 0 && (*/}
                    {/*            <div className={classes.cartItemCount}>!</div>*/}
                    {/*        )}*/}
                    {/*    </Link>*/}
                    {/*</Box>*/}
                </Box>
                <Box className={classes.mobileButtonSection}>
                    <ToggleMenu/>
                </Box>
            </Toolbar>
        </AppBar>
    );
});

export default Header;

