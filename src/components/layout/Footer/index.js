import React from "react";
import Typography from "@material-ui/core/Typography";
import {useTheme} from "../../../theme/themeContext";
import {themes} from "../../../theme/themeContext/themes";
import {Box, Icon} from "@material-ui/core";
import {Link} from "react-router-dom";
import {ReactComponent as FaceBookLogo} from "../../../assets/SocialMediaLogo/fb.svg";
import {ReactComponent as InstagramLogo} from "../../../assets/SocialMediaLogo/inst.svg";
import {ReactComponent as LinkedinLogo} from "../../../assets/SocialMediaLogo/in.svg";
import {ReactComponent as TikTokLogo} from "../../../assets/SocialMediaLogo/tt.svg";
import {ReactComponent as FirstButtonIcon} from "../../../assets/Icons/contact-icon.svg";
import {ReactComponent as SecondButtonIcon} from "../../../assets/Icons/support-icon.svg";


import useStyles from "./styles";
import StyledButton from "../../UI/StyledButton";
import {
    navLinksDataBydgoszcz,
    navLinksDataRegiony,
    navLinksDataKraje,
    navLinksDataWydarzenia,
    navLinksDataONas,
    navLinksDataFilmyAndOther,
} from "./data";
import LinedButton from "../../UI/LinedButton";


// eslint-disable-next-line no-unused-vars
const LinkText = ({text, to, subTitle}) => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);

    return (
        <Link to={to} className={classes.link}>
            <Typography className={subTitle ? classes.titleLinkSection : classes.linkText}>{text}</Typography>
        </Link>
    );
}

const socialLinks = [
    {
        to: 'https://www.linkedin.com/company/fundacja-krzewienia-kultury-i-turystyki-nad-rzek%C4%85/',
        icon: LinkedinLogo
    },
    {to: 'https://exmpl.com', icon: TikTokLogo},

    {to: 'https://www.facebook.com/FundacjaNadRzeka/', icon: FaceBookLogo},

    {to: 'https://www.instagram.com/fundacja.nadrzeka?igshid=YmMyMTA2M2Y%3D', icon: InstagramLogo},
];


function Footer() {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);

    return (
        <Box className={classes.footerWrapper}>
            <Box className={classes.mainSection}>
                <Box className={classes.firstButtonSection}>
                    <StyledButton text="Wesprzyj nas" to="/wesprzyj-nas" width="100%"/>
                </Box>
                <Box className={classes.firstButtonSection}>
                    <LinedButton text="SKONTAKTOWAĆ SIĘ Z DOWÓDCĄ" to="https://forms.gle/CG4xzZzapzC43mf76" width="100%" icon={FirstButtonIcon} borderBottom="none"/>
                    <LinedButton text="ZAPROPONOWAĆ POMYSŁ" to="https://forms.gle/1VHjeKPrECwrDMtA7" width="100%" icon={SecondButtonIcon}/>
                </Box>
                <Box className={classes.buttonWrapper}>
                    {socialLinks.map((link, index) => (
                        <Link to={link.to} key={index} className={classes.socialLink}>
                            <Icon component={link.icon} className={classes.socialIcon}/>
                        </Link>
                    ))}
                </Box>
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
        </Box>
    );
}

export default Footer;

