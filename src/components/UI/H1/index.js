import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {useTheme} from '../../../theme/themeContext';
import {useFontSize} from "../FontSizeChange/FontSizeContext";
import {themes} from "../../../theme/themeContext/themes";

const useStyles = makeStyles((theme) => ({
    h1: {
        color: ({textColor}) => textColor,
        fontSize: ({h1FontSize}) => h1FontSize,
        fontWeight: '500',
        fontFamily: 'Inter-Bold',
        marginBottom: '30px',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            fontSize: ({h1FontSizeMobile}) => h1FontSizeMobile,
        }
    },
}));

const H1 = ({text}) => {
    const {theme} = useTheme();
    const { fontSize } = useFontSize();
    const combinedTheme = {
        ...themes[theme],
        ...themes[fontSize]
    };

    const classes = useStyles(combinedTheme);

    return (
        <Typography variant="h1" className={classes.h1}>
            {text}
        </Typography>
    );
};

export default H1;
