import React, {useEffect} from 'react';
import BreadCrumbs from "../../UI/BreadCrumbs";
import SectionWrapper from "../../UI/SectionWrapper";
import {useTheme} from "../../../theme/themeContext";
import useStyles from "./styles";
import {themes} from "../../../theme/themeContext/themes";
import {Box, Typography} from "@material-ui/core";
import DonatBadge from "../../UI/DonatBadge";
import ContactForm from "../../UI/ContactForm";
import SklepCard from "../../UI/SklepCard";
import {useFontSize} from "../../UI/FontSizeChange/FontSizeContext";


const Sklep = () => {
    const {theme} = useTheme();
    const { fontSize } = useFontSize();
    const combinedTheme = {
        ...themes[theme],
        ...themes[fontSize]
    };

    const classes = useStyles(combinedTheme);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    return (
        <SectionWrapper
            id="sklep"
            paddingBottom="100px"
            paddingTop="120px"
        >
            <BreadCrumbs/>
            <Typography variant="h1" className={classes.titleSection}>
                Sklep
            </Typography>
            <Box>
                <SklepCard postLimit={20}/>
            </Box>
            <DonatBadge/>
            <ContactForm/>
        </SectionWrapper>
    );
};

export default Sklep;