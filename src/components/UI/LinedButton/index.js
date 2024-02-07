import {useTheme} from "../../../theme/themeContext";
import {themes} from "../../../theme/themeContext/themes";
import {useNavigate} from "react-router-dom";
import Button from "@material-ui/core/Button";
import React from "react";
import {Box, Icon, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    defaultButton: {
        backgroundColor: 'transparent',
        borderTop: `1px solid`,
        borderBottom: `1px solid`,
        borderRadius: '0',
        padding: '22px 0',
        borderColor: ({textColor}) => textColor,
        '& .MuiButton-label': {
            justifyContent: 'flex-start',
            display: 'flex',
            flexDirection: 'row',
            gap: '12px',
            textAlign: 'left',
        },
        '&:hover': {
            backgroundColor: 'transparent',
            borderColor: ({postsHoverTextColor}) => postsHoverTextColor,
            '& path': {
                color: ({postsHoverTextColor}) => postsHoverTextColor,
            },
            '& $text': {
                color: ({postsHoverTextColor}) => postsHoverTextColor,
            }
        },
        '& path': {
            transition: '300ms ease-in-out',
        },
    },
    text: {
        fontFamily: 'Inter-Regular',
        fontSize: '16px',
        fontWeight: 700,
        color: ({textColor}) => textColor,
        textTransform: 'uppercase',
        transition: "all 0.3s ease-out",
    }
}));

const LinedButton = ({text, width, to, clicked, icon}) => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);
    const navigate = useNavigate();


    const handleClick = () => {
        navigate(to);
    };

    return (
        <Button
            className={classes.defaultButton}
            style={{width: width}}
            onClick={clicked ? clicked : handleClick}
        >
            <Box>
                <Icon component={icon} className={classes.icon}/>
            </Box>
            <Box>
                <Typography className={classes.text}>{text}</Typography>
            </Box>
        </Button>
    );
};

export default LinedButton;