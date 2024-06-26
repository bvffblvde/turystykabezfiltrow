import React from 'react';
import SectionWrapper from "../../../UI/SectionWrapper";
import {makeStyles} from "@material-ui/core/styles";
import {themes} from "../../../../theme/themeContext/themes";
import {useTheme} from "../../../../theme/themeContext";
import {Box} from "@material-ui/core";
import Invest from "../../../../assets/Partners/invest.svg";
import Typography from "@material-ui/core/Typography";
import {useFontSize} from "../../../UI/FontSizeChange/FontSizeContext";

const useStyles = makeStyles((theme) => ({
    contentWrapper: {
        alignItems: 'center',
        width: '80%',
        margin: '0 auto',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            alignItems: 'unset',
        }
    },
    image: {
        objectFit: 'cover',
        objectPosition: 'center',
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            height: '100%',
        }
    },
    descriptionText: {
        fontFamily: 'Inter-Regular',
        fontSize: ({h4FontSize}) => h4FontSize,
        fontWeight: '400',
        [theme.breakpoints.down('sm')]: {
            fontSize: ({h4FontSizeMobile}) => h4FontSizeMobile,
        }
    },
    imageBox: {
        width: '100%',
        height: '100%',
        marginBottom: '32px',
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        }
    }
}));


const InvestBlock = React.memo(() => {
    const {theme} = useTheme();
    const { fontSize } = useFontSize();
    const combinedTheme = {
        ...themes[theme],
        ...themes[fontSize]
    };

    const classes = useStyles(combinedTheme);

    return (
        <SectionWrapper id="main-invest">
            <Box className={classes.contentWrapper}>
                <Box className={classes.imageBox}>
                    <img src={Invest} alt="Invest" className={classes.image}/>
                </Box>
                <Box>
                    <Typography className={classes.descriptionText}>
                        Dostosowanie strony internetowej sfinansowane ze środków grantu „Turystyka BEZ FILTRÓW i BEZ BARIER!” realizowanego w ramach projektu pt. Turystyka dostępna 1.0. współfinansowanego ze środków PFRON, w ramach pilotażowego programu „Dostępność ponad barierami”.
                    </Typography>
                </Box>
            </Box>
        </SectionWrapper>
    );
});

export default InvestBlock;