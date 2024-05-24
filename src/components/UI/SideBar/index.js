import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {Box, Button, Typography} from "@material-ui/core";
import {useTheme} from "../../../theme/themeContext";
import {themes} from "../../../theme/themeContext/themes";
import {useFontSize} from "../FontSizeChange/FontSizeContext";

const useStyles = makeStyles((theme) => ({
    sidebar: {
        position: 'sticky',
        top: '140px',
        height: '100vh',
        backgroundColor: 'transparent',
    },
    linkButton: {
        backgroundColor: 'transparent',
        alignItems: 'flex-start',
        padding: '0',
        transition: 'all 0.3s ease-out',
        '& .MuiButton-label': {
            justifyContent: 'flex-start',
        },
        '&:hover': {
            backgroundColor: 'transparent',
            color: ({useLocationLinkColorHover}) => useLocationLinkColorHover,
        },
    },
    linkText: {
        fontSize: ({h4FontSize}) => h4FontSize,
        fontFamily: 'Inter-Regular',
        fontWeight: 500,
        padding: '0',
        transition: 'all 0.3s ease-out',
        color: ({useLocationLinkColor}) => useLocationLinkColor,
        textTransform: 'none',
        '&:hover': {
            color: ({useLocationLinkColorHover}) => useLocationLinkColorHover,
        },
        [theme.breakpoints.down('sm')]: {
            fontSize: ({h4FontSizeMobile}) => h4FontSizeMobile,
        }
    },
    flexBox: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'flex-start',
    },
}));

const Sidebar = ({ children, sections }) => {
    const { theme } = useTheme();
    const { fontSize } = useFontSize();
    const combinedTheme = {
        ...themes[theme],
        ...themes[fontSize]
    };

    const classes = useStyles(combinedTheme);
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const header = document.querySelector('#root > header > div');
        if (header) {
            setHeaderHeight(header.clientHeight);
        }
    }, []);

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
            window.scrollTo({
                top: section.offsetTop - headerHeight - 100, // 20 - пример вашего отступа
                behavior: 'smooth',
            });
        }
    };

    return (
        <Box className={classes.sidebar}>
            <Box className={classes.flexBox}>
                {sections ? (
                    sections.map((section, index) => (
                        <Button
                            key={section.id}
                            className={classes.linkButton}
                            onClick={() => scrollToSection(section.id)}
                        >
                            <Typography className={classes.linkText}>
                                {section.label}
                            </Typography>
                        </Button>
                    ))
                ) : (
                    children
                )}
            </Box>
        </Box>
    );
};

export default Sidebar;
