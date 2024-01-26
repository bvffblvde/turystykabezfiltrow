import React from 'react';
import SectionWrapper from "../../UI/SectionWrapper";
import {makeStyles} from "@material-ui/core/styles";
import {themes} from "../../../theme/themeContext/themes";
import {useTheme} from "../../../theme/themeContext";
import {Box} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Logo from "../../../assets/Logo/LOGO.svg";
import StyledButton from "../StyledButton";

const useStyles = makeStyles((theme) => ({
    badge: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '36px 20px',
        backgroundColor: ({defaultButtonBackgroundColor}) => defaultButtonBackgroundColor,
        border: 'none',
        borderRadius: '12px',
    },
    badgeDescription: {
        color: ({defaultButtonTextColor}) => defaultButtonTextColor,
        fontSize: '20px',
        fontWeight: '500',
        fontFamily: 'Inter-Regular',
    },
    descriptionWrapper: {
        width: '50%',
    }
}));

const DonatBadgeComponent = () => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);

    return (
        <SectionWrapper id="main-donat-badge">
            <Box className={classes.badge}>
                <Box>
                    <a href={'/'}>
                        <img src={Logo} alt="logo"/>
                    </a>
                </Box>
                <Box className={classes.descriptionWrapper}>
                    <Typography variant="h2" component="h2" className={classes.badgeDescription}>
                        Lorem ipsum dolor sit amet consectetur. Mollis eget vel ut sit bibendum mauris gravida orci
                        quis. Malesuada integer ac aliquet maecenas blandit orci adipiscing sagittis.
                    </Typography>
                </Box>
                <Box>
                    <StyledButton text="Zobacz więcej" width="100%" to="/"/>
                </Box>
            </Box>
        </SectionWrapper>
    );
};

export default DonatBadgeComponent;