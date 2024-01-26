import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {IconButton, Drawer, Box, Icon} from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import {useTheme} from "../../../theme/themeContext";
import {themes} from "../../../theme/themeContext/themes";
import Logo from "../../../assets/Logo/LOGO.svg";
import {Link} from "react-router-dom";
import Button from "@material-ui/core/Button";
import {ReactComponent as ToggleMenuIcon} from "../../../assets/Icons/ToggleMenuIcon.svg";
import {ReactComponent as FaceBookLogo} from "../../../assets/Icons/facebook-logo.svg";
import {ReactComponent as InstagramLogo} from "../../../assets/Icons/inst-logo.svg";
import {ReactComponent as LinkedinLogo} from "../../../assets/Icons/linkedin-logo.svg";

const navLinksData = [
    {url: '/o-fundacji', text: 'O fundacji'},
    {url: '/projekty', text: 'Projekty'},
    {url: '/aktualnosci', text: 'Aktualności'},
    {url: 'https://turystykabezfiltrow.com/', text: 'Blog'},
    {url: 'https://turystykabezfiltrow.com/wycieczki/', text: 'Wycieczki'},
    {url: '/kontakt', text: 'Kontakt'},
];

const useStyles = makeStyles((theme) => ({
    menuButton: {
        padding: '0',
        transition: "all 0.3s ease-out",
        backgroundColor: 'transparent',
        '& path': {
            fill: ({iconColorFill}) => iconColorFill,
        },
        '&:hover': {
            backgroundColor: 'transparent',
            '& $hamburgerIcon': {
                '& line': {
                    stroke: ({iconColorFillHover}) => iconColorFillHover,
                }
            }
        },
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    list: {
        width: '100%',
        height: '100%',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
    },
    drawer: {
        width: '100%',
        height: '100%',
        backgroundColor: ({backgroundColor}) => backgroundColor,
    },
    navBlock: {
        color: '#f2f2f2',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',

    },
    navigationText: {
        color: ({postsTextColor}) => postsTextColor,
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '24px',
        fontFamily: 'Helvetica-Regular',
        transition: "all 0.3s ease-out",
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'transparent',
            color: ({postsHoverTextColor}) => postsHoverTextColor,
        },
        '&:focus': {
            backgroundColor: 'transparent',
        }
    },
    closeIcon: {
        color: ({iconColorFill}) => iconColorFill,
        fontSize: '40px',
        marginLeft: 'auto',
        transition: "all 0.3s ease-out",
        '&:hover': {
            color: ({iconColorFillHover}) => iconColorFillHover,
        }
    },
    hamburgerIcon: {
        width: '40px',
        height: '40px',
        backgroundColor: 'transparent',
        transition: "all 0.3s ease-out",
        '& line': {
            transition: "all 0.3s ease-out",
            stroke: ({iconColorFill}) => iconColorFill,
        },
        '&:hover': {
            transition: "all 0.3s ease-out",
            backgroundColor: 'transparent',
            '& line': {
                stroke: ({iconColorFillHover}) => iconColorFillHover,
            }
        }
    },
    icon: {
        width: '24px',
        height: '24px',
    },
    headerBlock: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    root: {
        width: '100%',
        backgroundColor: '#1E1E1E',
    },
    navButton: {
        color: ({textColor}) => textColor,
        backgroundColor: 'transparent',
        justifyContent: 'flex-start',
        borderRadius: '0',
        transition: "all 0.3s ease-out",
        padding: '0',
        '&:hover': {
            backgroundColor: 'transparent',
        },
        '&:focus': {
            backgroundColor: 'transparent',
        }
    },
    boxView: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginBottom: '40px',
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: '40px',
        marginBottom: '32px',
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
    titleToggleMenuFooter: {
        color: ({textColor}) => textColor,
        fontSize: '16px',
        fontWeight: '700',
        lineHeight: '24px',
        fontFamily: 'Helvetica-Bold',
        textTransform: 'none',
    },
    textToggleMenuFooter: {
        color: ({postsTextColor}) => postsTextColor,
        fontSize: '16px',
        fontWeight: '400',
        lineHeight: '24px',
        fontFamily: 'Helvetica-Regular',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'transparent',
            color: ({postsHoverTextColor}) => postsHoverTextColor,
        }
    }
}));

function ToggleMenu() {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(open);
    };

    const list = () => (
            <div
                className={classes.list}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
            >
                <Box className={classes.headerBlock}>
                    <a href={'/'}>
                        <img src={Logo} alt="logo" className={classes.logo}/>
                    </a>
                    <Box>
                        <CloseIcon className={classes.closeIcon} onClick={toggleDrawer(false)}/>
                    </Box>
                </Box>
                <Box className={classes.boxView}>
                    {navLinksData.map((item, index) => (
                        <Link key={index} to={item.url} className={classes.link}>
                            <Button className={classes.navButton}>
                                <Typography className={classes.navigationText}>
                                    {item.text}
                                </Typography>
                            </Button>
                        </Link>
                    ))}
                </Box>
                <Box className={classes.buttonWrapper}>
                    <Link to={'https://www.facebook.com/FundacjaNadRzeka/'} className={classes.link}>
                        <Icon
                            component={FaceBookLogo}
                            className={classes.icon}
                            src={FaceBookLogo}
                        />
                    </Link>
                    <Link to={'https://www.linkedin.com/company/fundacja-krzewienia-kultury-i-turystyki-nad-rzek%C4%85/'}
                          className={classes.link}>
                        <Icon
                            component={LinkedinLogo}
                            className={classes.icon}
                            src={LinkedinLogo}
                        />
                    </Link>
                    <Link to={'https://www.instagram.com/fundacja.nad_rzeka?igshid=YmMyMTA2M2Y%3D'}
                          className={classes.link}>
                        <Icon
                            component={InstagramLogo}
                            className={classes.icon}
                            src={InstagramLogo}
                        />
                    </Link>
                </Box>
                <Box>
                    <Typography className={classes.titleToggleMenuFooter} style={{marginBottom: '10px'}}>
                        Kontakt
                    </Typography>
                    <Typography className={classes.titleToggleMenuFooter}>
                        Tel:
                    </Typography>
                    <Box style={{marginBottom: '20px'}}>
                        <Typography className={classes.textToggleMenuFooter} style={{marginBottom: '10px'}}>
                            <a href="tel:+48 11 123 55 66" style={{textDecoration: 'none', color: 'inherit'}}>
                                +48 11 123 55 66
                            </a>
                        </Typography>
                        <Typography className={classes.textToggleMenuFooter}>
                            <a href="tel:+48 11 123 55 66" style={{textDecoration: 'none', color: 'inherit'}}>
                                +48 11 123 55 66
                            </a>
                        </Typography>
                    </Box>
                    <Box>
                        <Typography className={classes.titleToggleMenuFooter}>
                            E-mail:
                        </Typography>
                        <Typography className={classes.textToggleMenuFooter}>
                            <a href="mailto:fundacja.nadrzeka@gmail.com" style={{textDecoration: 'none', color: 'inherit'}}>
                                fundacja.nadrzeka@gmail.com
                            </a>
                        </Typography>
                    </Box>

                </Box>
            </div>
        )
    ;

    return (
        <div>
            <IconButton edge="start" className={classes.menuButton} aria-label="menu"
                        onClick={toggleDrawer(true)}>
                <Icon component={ToggleMenuIcon} className={classes.hamburgerIcon} src={ToggleMenuIcon}/>
            </IconButton>
            <Drawer anchor="top" open={open} onClose={toggleDrawer(false)} classes={{paper: classes.drawer}}>
                {list()}
            </Drawer>
        </div>
    );
}

export default ToggleMenu;