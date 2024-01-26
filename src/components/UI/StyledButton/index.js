import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../theme/default';
import { useNavigate } from 'react-router-dom';
import {useTheme} from "../../../theme/themeContext";
import {themes} from "../../../theme/themeContext/themes";

const useStyles = makeStyles((theme) => ({
    defaultButton: {
        color: ({defaultButtonTextColor}) => defaultButtonTextColor,
        backgroundColor: ({defaultButtonBackgroundColor}) => defaultButtonBackgroundColor,
        border: `1px solid`,
        borderColor: ({defaultButtonBorderColor}) => defaultButtonBorderColor,
        borderRadius: '6px',
        padding: '10px',
        fontFamily: 'Inter-Regular',
        fontSize: '16px',
        lineHeight: '20px',
        fontWeight: '400',
        textTransform: 'none',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
            backgroundColor: ({defaultHoverButtonBackgroundColor}) => defaultHoverButtonBackgroundColor,
            color: ({defaultHoverButtonTextColor}) => defaultHoverButtonTextColor,
            borderColor: ({defaultHoverButtonBorderColor}) => defaultHoverButtonBorderColor,
        },
        [theme.breakpoints.down('sm')]: {
            padding: '10px 10px',
            fontSize: '14px',
        },
    },
    darkButton: {
        color: ({darkButtonTextColor}) => darkButtonTextColor,
        backgroundColor: ({darkButtonBackgroundColor}) => darkButtonBackgroundColor,
        border: `1px solid`,
        borderColor: ({darkButtonBorderColor}) => darkButtonBorderColor,
        borderRadius: '0',
        padding: '10px 32px',
        fontFamily: 'Helvetica-Regular',
        fontSize: '16px',
        lineHeight: '19px',
        fontWeight: '400',
        textTransform: 'none',

        '&:hover': {
            backgroundColor: ({darkHoverButtonBackgroundColor}) => darkHoverButtonBackgroundColor,
            color: ({darkHoverButtonTextColor}) => darkHoverButtonTextColor,
            borderColor: ({darkHoverButtonBorderColor}) => darkHoverButtonBorderColor,
        },
        [theme.breakpoints.down('sm')]: {
            padding: '10px 10px',
            fontSize: '14px',
        },
    },
}));

const StyledButton = ({ variant, text, width, to }) => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);
    const navigate = useNavigate();

    const getButtonStyle = () => {
        switch (variant) {
            case 'outlined':
                return classes.outlinedButton;
            case 'blackOutlined':
                return classes.blackOutlinedButton;
            case 'dark':
                return classes.darkButton;
            default:
                return classes.defaultButton;
        }
    };

    const handleClick = () => {
        navigate(to);
    };

    return (
        <Button
            className={getButtonStyle()}
            variant={variant}
            style={{ width: width }}
            onClick={handleClick}
        >
            {text}
        </Button>
    );
};

export default StyledButton;