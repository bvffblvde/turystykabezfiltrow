import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {colors} from '../../../theme/default';
import Typography from "@material-ui/core/Typography";
import {Box} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {useTheme} from "../../../theme/themeContext";
import {themes} from "../../../theme/themeContext/themes";

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
        fontSize: '20px',
        fontFamily: 'Helvetica-Regular',
        fontWeight: 500,
        padding: '0',
        transition: 'all 0.3s ease-out',
        color: ({useLocationLinkColor}) => useLocationLinkColor,
        textTransform: 'none',
        '&:hover': {
            color: ({useLocationLinkColorHover}) => useLocationLinkColorHover,
        },
    },
    flexBox: {
        display: 'flex',
        flexDirection: 'column',
        gap: '40px',
        alignItems: 'flex-start',
    },
}));

const Sidebar = ({children}) => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);
    const [headerHeight, setHeaderHeight] = useState(0);

    useEffect(() => {
        const header = document.querySelector('#root > header > div');
        if (header) {
            setHeaderHeight(header.clientHeight);
        }
    }, []);

    // const scrollToSection = (sectionId) => {
    //     const section = document.getElementById(sectionId);
    //     if (section) {
    //         window.scrollTo({
    //             top: section.offsetTop - headerHeight - 100, // 20 - пример вашего отступа
    //             behavior: 'smooth',
    //         });
    //     }
    // };

    return (
        <Box className={classes.sidebar}>
            <Box className={classes.flexBox}>
                {children}
            </Box>
        </Box>
    );
};

export default Sidebar;
