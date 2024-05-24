import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {useTheme} from '../../../theme/themeContext';
import {themes} from "../../../theme/themeContext/themes";
import {useFontSize} from "../FontSizeChange/FontSizeContext";

const useStyles = makeStyles((theme) => ({
    h4: {
        color: ({postsTextColor}) => postsTextColor,
        transition: "all 0.5s ease-out",
        fontSize: ({h4FontSize}) => h4FontSize,
        fontWeight: '500',
        fontFamily: 'Inter-Regular',
        marginBottom: '12px',
        [theme.breakpoints.down('sm')]: {
            fontSize: ({h4FontSizeMobile}) => h4FontSizeMobile,
            marginBottom: '10px',

        }
    },
}));

const H4 = ({ children }) => {
    const { theme } = useTheme();
    const { fontSize } = useFontSize();
    const combinedTheme = {
        ...themes[theme],
        ...themes[fontSize]
    };

    const classes = useStyles(combinedTheme);


    return (
        <Typography variant="h4" className={classes.h4} id="myElementId" dangerouslySetInnerHTML={{__html: children}}/>
    );
};

export default H4;