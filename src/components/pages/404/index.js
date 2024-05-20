import React from 'react';
import SectionWrapper from "../../UI/SectionWrapper";
import {Box} from "@material-ui/core";
import {useTheme} from "../../../theme/themeContext";
import {themes} from "../../../theme/themeContext/themes";
import Typography from "@material-ui/core/Typography";
import useStyles from "./styles";
import StyledButton from "../../UI/StyledButton";

const NotFoundPage = () => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);

    return (
        <SectionWrapper paddingTop="120px">
            <Box className={classes.boxWrapper}>
                <Typography variant="h1" className={classes.title}>
                    Nie znaleziono strony :(
                </Typography>
                <Typography variant="h4" className={classes.subTitle}>
                    Przepraszamy, strona, której szukasz, nie istnieje. (Lub został przeniesiony)
                </Typography>
                <StyledButton to={'/'} text="Wróć na stronę główną"/>
            </Box>
        </SectionWrapper>
    );
};

export default NotFoundPage;