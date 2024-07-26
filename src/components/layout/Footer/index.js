import React from "react";
import Typography from "@material-ui/core/Typography";
import {useTheme} from "../../../theme/themeContext";
import {themes} from "../../../theme/themeContext/themes";
import {Accordion, AccordionDetails, AccordionSummary, Box, Button, Icon} from "@material-ui/core";
import {Link} from "react-router-dom";
import {ReactComponent as FaceBookLogo} from "../../../assets/SocialMediaLogo/fb.svg";
import {ReactComponent as InstagramLogo} from "../../../assets/SocialMediaLogo/inst.svg";
import {ReactComponent as LinkedinLogo} from "../../../assets/SocialMediaLogo/in.svg";
import {ReactComponent as TikTokLogo} from "../../../assets/SocialMediaLogo/tt.svg";
import {ReactComponent as FirstButtonIcon} from "../../../assets/Icons/contact-icon.svg";
import {ReactComponent as SecondButtonIcon} from "../../../assets/Icons/support-icon.svg";


import StyledButton from "../../UI/StyledButton";
import {
    navLinksDataBydgoszcz,
    navLinksDataRegiony,
    navLinksDataKraje,
    navLinksDataWydarzenia,
    navLinksDataONas,
    navLinksDataFilmyAndOther,
    navLinksData,
} from "./data";
import LinedButton from "../../UI/LinedButton";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AdbisBadge from "../../UI/AdbisCreatedPlug";
import {useFontSize} from "../../UI/FontSizeChange/FontSizeContext";
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
            display: 'none',
            flexDirection: "column",
            gap: '32px',
        },
    },
    mobileRoot: {
        display: 'none',
        [theme.breakpoints.down("sm")]: {
            display: 'flex',
            flexDirection: "column",
            width: '100%',
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
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
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
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        }
    },
    navWrapper: {
        width: '30%',
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
    titleLinkSection: {
        fontFamily: 'Inter-Regular',
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
        fontWeight: 400,
        color: ({postsTextColor}) => postsTextColor,
        marginBottom: '12px',
        textTransform: 'capitalize',
        transition: "all 0.3s ease-out",
        '&:hover': {
            color: ({postsHoverTextColor}) => postsHoverTextColor,
        }
    },
    navigationText: {
        color: ({textColor}) => textColor,
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
        fontWeight: '700',
        fontFamily: 'Inter-Regular',
        transition: "all 0.3s ease-out",
        textTransform: 'uppercase',
        textAlign: 'left',
        margin: '10px 0',
        '&:hover': {
            backgroundColor: 'transparent',
            color: ({postsHoverTextColor}) => postsHoverTextColor,
        },
        '&:focus': {
            backgroundColor: 'transparent',
        }
    },
    firstButtonSection: {
        marginBottom: '40px',
    },
    accordionBox: {
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
        '& .MuiAccordionSummary-root': {
            padding: '0',
            //borderBottom: '1px solid',
            //borderColor: ({borderColor}) => borderColor,
        },
        '& .MuiAccordionSummary-content': {
            margin: '0',
        }
    },
    socialLink: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingBottom: '20px',
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
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
        fontWeight: '700',
        fontFamily: 'Inter-Bold',
        textTransform: 'none',
    },
    textToggleMenuFooter: {
        color: ({postsTextColor}) => postsTextColor,
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
        fontWeight: '400',
        fontFamily: 'Inter-Regular',
        textTransform: 'none',
        '&:hover': {
            backgroundColor: 'transparent',
            color: ({postsHoverTextColor}) => postsHoverTextColor,
        }
    },
}));

function NavigationLink({ link }) {
    const { theme } = useTheme();
    const { fontSize } = useFontSize();
    const combinedTheme = {
        ...themes[theme],
        ...themes[fontSize]
    };

    const classes = useStyles(combinedTheme);
    // eslint-disable-next-line no-unused-vars
    const [open, setOpen] = React.useState(false);


    const renderSubLinks = (subLinks) => {
        const uniqueSubLinks = subLinks.reduce((unique, subLink) => {
            const isUnique = !unique.some((existingLink) => existingLink.text === subLink.text);
            return isUnique ? [...unique, subLink] : unique;
        }, []);


        return (
            <Accordion className={classes.accordionBox}>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>} className={classes.accSummary}>
                    {link.subLinks && (
                        <Typography className={classes.navigationText}>{link.text}</Typography>
                    )}
                </AccordionSummary>
                <AccordionDetails>
                    <Box className={classes.subLinks}>
                        {uniqueSubLinks.map((subLink, index) => (
                            <Box key={index}>
                                <Link to={subLink.url} className={classes.link}
                                      onClick={() => setOpen(false)} {...(navLinksData.openInNewTab && {
                                    target: '_blank',
                                    rel: 'noopener noreferrer',
                                })}>
                                    <Button className={classes.navButton}>
                                        <Typography className={classes.navigationText}>{subLink.text}</Typography>
                                    </Button>
                                </Link>
                            </Box>
                        ))}
                    </Box>
                </AccordionDetails>
            </Accordion>
        );
    };

    return (
        <div>
            {link.url ? (
                <Link to={link.url} className={classes.link}
                      onClick={() => setOpen(false)} {...(navLinksData.openInNewTab && {
                    target: '_blank',
                    rel: 'noopener noreferrer',
                })}>
                    <Button className={classes.navButton}>
                        <Typography className={classes.navigationText}>
                            {link.text}
                        </Typography>
                    </Button>
                </Link>
            ) : null}
            {link.subLinks && renderSubLinks(link.subLinks)}
        </div>
    );
}


// eslint-disable-next-line no-unused-vars
const LinkText = ({text, to, subTitle}) => {
    const {theme} = useTheme();
    const { fontSize } = useFontSize();
    const combinedTheme = {
        ...themes[theme],
        ...themes[fontSize]
    };

    const classes = useStyles(combinedTheme);

    return (
        <Link to={to} className={classes.link}>
            <Typography className={subTitle ? classes.titleLinkSection : classes.linkText}>{text}</Typography>
        </Link>
    );
}

const socialLinks = [
    {
        to: 'https://www.linkedin.com/company/weckwerth-turystyka-bez-filtr%C3%B3w/',
        icon: LinkedinLogo
    },
    {to: 'https://www.tiktok.com/@turystyka.bez.filtrow', icon: TikTokLogo},

    {to: 'https://www.facebook.com/turystykabezfiltrow', icon: FaceBookLogo},

    {to: 'https://www.instagram.com/turystykabezfiltrow/', icon: InstagramLogo},
];


const Footer = React.memo(() => {
    const {theme} = useTheme();
    const { fontSize } = useFontSize();
    const combinedTheme = {
        ...themes[theme],
        ...themes[fontSize]
    };

    const classes = useStyles(combinedTheme);

    return (
        <>
            <Box className={classes.footerWrapper}>
                <Box className={classes.mainSection}>
                    <Box className={classes.firstButtonSection}>
                        <StyledButton text="Wesprzyj nas" to="/wesprzyj-nas" width="100%"/>
                    </Box>
                    <Box className={classes.firstButtonSection}>
                        <LinedButton text="Dołącz do zespołu!" to="https://forms.gle/CG4xzZzapzC43mf76"
                                     width="100%"
                                     icon={FirstButtonIcon} borderBottom="none"/>
                        <LinedButton text="Zaproponuj pomysł!" to="https://forms.gle/1VHjeKPrECwrDMtA7" width="100%"
                                     icon={SecondButtonIcon}/>
                    </Box>
                    <Box className={classes.buttonWrapper} style={{marginBottom: '30px'}}>
                        {socialLinks.map((link, index) => (
                            <Link to={link.to} key={index} className={classes.socialLink}>
                                <Icon component={link.icon} className={classes.socialIcon}/>
                            </Link>
                        ))}
                    </Box>

                    <LinkText text="Polityka prywatności" to="/polityka-prywatnosci"/>
                    <LinkText text="Regulamin sklep" to="/regulamin"/>
                    <LinkText text="Decaracja dostępności" to="/declaracja-dostepnosci"/>

                </Box>
                <div className={classes.root}>
                    <Box className={classes.navWrapper}>
                        {navLinksDataBydgoszcz.map((link, index) => (
                            <Box key={index}>
                                <LinkText text={link.title} to={link.url} className={classes.titleLinkSection}/>
                                {link.subLinks && link.subLinks.map((subLink, index) => (
                                    <LinkText key={index} text={subLink.subTitle} to={subLink.url} subTitle/>
                                ))}
                            </Box>
                        ))}
                    </Box>
                    <Box className={classes.navWrapper}>
                        {navLinksDataRegiony.map((link, index) => (
                            <Box key={index}>
                                <LinkText text={link.title} to={link.url} className={classes.titleLinkSection}/>
                                {link.subLinks && link.subLinks.map((subLink, index) => (
                                    <LinkText key={index} text={subLink.subTitle} to={subLink.url} subTitle/>
                                ))}
                            </Box>
                        ))}
                    </Box>
                    <Box className={classes.navWrapper}>
                        {navLinksDataKraje.map((link, index) => (
                            <Box key={index}>
                                <LinkText text={link.title} to={link.url} className={classes.titleLinkSection}/>
                                {link.subLinks && link.subLinks.map((subLink, index) => (
                                    <LinkText key={index} text={subLink.subTitle} to={subLink.url} subTitle/>
                                ))}
                            </Box>
                        ))}
                    </Box>
                    <Box className={classes.navWrapper}>
                        {navLinksDataWydarzenia.map((link, index) => (
                            <Box key={index}>
                                <LinkText text={link.title} to={link.url} className={classes.titleLinkSection}/>
                                {link.subLinks && link.subLinks.map((subLink, index) => (
                                    <LinkText key={index} text={subLink.subTitle} to={subLink.url} subTitle/>
                                ))}
                            </Box>
                        ))}
                    </Box>
                    <Box className={classes.navWrapper}>
                        {navLinksDataONas.map((link, index) => (
                            <Box key={index}>
                                <LinkText text={link.title} to={link.url} className={classes.titleLinkSection}/>
                                {link.subLinks && link.subLinks.map((subLink, index) => (
                                    <LinkText key={index} text={subLink.subTitle} to={subLink.url} subTitle/>
                                ))}
                            </Box>
                        ))}
                    </Box>
                    <Box className={classes.navWrapper}>
                        {navLinksDataFilmyAndOther.map((link, index) => (
                            <Box key={index}>
                                <LinkText text={link.title} to={link.url} className={classes.titleLinkSection}/>
                            </Box>
                        ))}
                    </Box>
                </div>
                <Box className={classes.mobileRoot}>
                    <Box className={classes.boxView}>
                        <Box className={classes.mainLinks}>
                            {navLinksData.map((navLink, index) => (
                                <Box key={index}
                                     style={{borderBottom: '1px solid', borderColor: `${themes[theme].borderColor}`}}>
                                    <NavigationLink link={navLink}/>
                                </Box>
                            ))}
                        </Box>
                    </Box>
                    <Box className={classes.firstButtonSection}>
                        <StyledButton text="Wesprzyj nas" to="/wesprzyj-nas" width="100%"/>
                    </Box>
                    <Box className={classes.firstButtonSection}>
                        <LinedButton text="Dołącz do zespołu!" to="https://forms.gle/CG4xzZzapzC43mf76"
                                     width="100%"
                                     icon={FirstButtonIcon} borderBottom="none"/>
                        <LinedButton text="Zaproponuj pomysł!" to="https://forms.gle/1VHjeKPrECwrDMtA7" width="100%"
                                     icon={SecondButtonIcon}/>
                    </Box>
                    <Box className={classes.socialLink}>
                        {socialLinks.map((link, index) => (
                            <Link to={link.to} key={index} className={classes.socialLink}>
                                <Icon component={link.icon} className={classes.socialIcon}/>
                            </Link>
                        ))}
                    </Box>

                    <LinkText text="Polityka prywatności" to="/polityka-prywatnosci"/>
                    <LinkText text="Regulamin sklep" to="/regulamin"/>
                    <LinkText text="Decaracja dostępności" to="/declaracja-dostepnosci"/>
                </Box>
            </Box>
            <AdbisBadge/>
        </>
    );
});

export default Footer;

