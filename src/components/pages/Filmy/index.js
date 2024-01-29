import React, {useEffect, useState} from 'react';
import {
    Typography, Box, makeStyles,
} from '@material-ui/core';
import SectionWrapper from "../../UI/SectionWrapper";
import {useTheme} from "../../../theme/themeContext";
import {themes} from "../../../theme/themeContext/themes";
import BreadCrumbs from "../../UI/BreadCrumbs";
import ContactForm from "../../UI/ContactForm";
import DonatBadgeComponent from "../../UI/DonatBadge";
import ShareButton from "../../UI/ShareButton";

const useStyles = makeStyles((theme) => ({
    root: {},
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: '60px',
        fontWeight: '500',
        color: ({textColor}) => textColor,
        textAlign: 'center',
        marginBottom: '32px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
            marginBottom: '20px',
        }
    },
}));

const FilmyPage = () => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <SectionWrapper id="Filmy" paddingBottom="100px" paddingTop="120px">
            <BreadCrumbs/>
            <Typography variant="h1" className={classes.title}>
                Filmy
            </Typography>
            <Box className={classes.root}>
                <ShareButton url={window.location.href}/>
            </Box>
            <DonatBadgeComponent/>
            <ContactForm/>
        </SectionWrapper>
    );
};

export default FilmyPage;