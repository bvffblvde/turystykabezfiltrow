import {useTheme} from "../../../theme/themeContext";
import {useFontSize} from "../FontSizeChange/FontSizeContext";
import {themes} from "../../../theme/themeContext/themes";
import {Box, Icon} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import {ReactComponent as FaceBookLogo} from "../../../assets/SocialMediaLogo/fb.svg";
import {ReactComponent as InstagramLogo} from "../../../assets/SocialMediaLogo/inst.svg";
import {ReactComponent as LinkedinLogo} from "../../../assets/SocialMediaLogo/in.svg";
import {ReactComponent as TikTokLogo} from "../../../assets/SocialMediaLogo/tt.svg";

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: ({backgroundColor}) => backgroundColor,
        color: ({textColor}) => textColor,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '20px',
        boxShadow: '0px 0px 16px 0px #0000000f',
        transition: "all 0.5s ease-out",
        borderRadius: '16px',
        marginTop: '10px',
    },
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: '40px',
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
}));


const SocialCard = () => {
    const {theme} = useTheme();
    const {fontSize} = useFontSize();
    const combinedTheme = {
        ...themes[theme],
        ...themes[fontSize]
    };

    const classes = useStyles(combinedTheme);

    return (
        <Box className={classes.root}>
            <Box className={classes.buttonWrapper}>
                <Link to={'https://www.linkedin.com/company/weckwerth-turystyka-bez-filtr%C3%B3w/'}
                      className={classes.link} rel="noreferrer" target="_blank">
                    <Icon
                        component={LinkedinLogo}
                        className={classes.icon}
                        src={LinkedinLogo}
                    />
                </Link>
                <Link to={'https://www.tiktok.com/@turystyka.bez.filtrow'} rel="noreferrer" target="_blank"
                      className={classes.link}>
                    <Icon
                        component={TikTokLogo}
                        className={classes.icon}
                        src={TikTokLogo}
                    />
                </Link>
                <Link to={'https://www.facebook.com/turystykabezfiltrow'} rel="noreferrer" target="_blank"
                      className={classes.link}>
                    <Icon
                        component={FaceBookLogo}
                        className={classes.icon}
                        src={FaceBookLogo}
                    />
                </Link>
                <Link to={'https://www.instagram.com/turystykabezfiltrow/'} rel="noreferrer" target="_blank"
                      className={classes.link}>
                    <Icon
                        component={InstagramLogo}
                        className={classes.icon}
                        src={InstagramLogo}
                    />
                </Link>
            </Box>
        </Box>
    );
};

export default SocialCard;
