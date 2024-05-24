import React from 'react';
import Button from '@material-ui/core/Button';
import {makeStyles} from '@material-ui/core/styles';
import {useNavigate} from 'react-router-dom';
import {useTheme} from '../../../theme/themeContext';
import {themes} from '../../../theme/themeContext/themes';
import {useFontSize} from "../FontSizeChange/FontSizeContext";

const useStyles = makeStyles((theme) => ({
    defaultButton: {
        color: ({defaultButtonTextColor}) => defaultButtonTextColor,
        backgroundColor: ({defaultButtonBackgroundColor}) => defaultButtonBackgroundColor,
        border: `1px solid`,
        borderColor: ({defaultButtonBorderColor}) => defaultButtonBorderColor,
        borderRadius: '6px',
        padding: '10px',
        fontFamily: 'Inter-Regular',
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
        fontWeight: '400',
        textTransform: 'none',
        transition: 'all 0.3s ease-in-out',

        '&:hover': {
            backgroundColor: ({defaultHoverButtonBackgroundColor}) => defaultHoverButtonBackgroundColor,
            color: ({defaultHoverButtonTextColor}) => defaultHoverButtonTextColor,
            borderColor: ({defaultHoverButtonBorderColor}) => defaultHoverButtonBorderColor,
        },
        '&:disabled': {
            opacity: '0.5',
        },
        [theme.breakpoints.down('sm')]: {
            padding: '10px 10px',
            fontSize: ({descriptionTextFontSizeMobile}) => descriptionTextFontSizeMobile,
        },
    },
    whiteButton: {
        color: ({darkButtonTextColor}) => darkButtonTextColor,
        backgroundColor: ({darkButtonBackgroundColor}) => darkButtonBackgroundColor,
        border: `1px solid`,
        borderColor: ({darkButtonBorderColor}) => darkButtonBorderColor,
        borderRadius: '6px',
        padding: '10px',
        fontFamily: 'Inter-Regular',
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
        fontWeight: '400',
        textTransform: 'none',

        '&:hover': {
            backgroundColor: ({darkHoverButtonBackgroundColor}) => darkHoverButtonBackgroundColor,
            color: ({darkHoverButtonTextColor}) => darkHoverButtonTextColor,
            borderColor: ({darkHoverButtonBorderColor}) => darkHoverButtonBorderColor,
        },
        [theme.breakpoints.down('sm')]: {
            padding: '10px 10px',
            fontSize: ({descriptionTextFontSizeMobile}) => descriptionTextFontSizeMobile,
        },
    },
    outlinedButton: {
        color: ({defaultHoverButtonTextColor}) => defaultHoverButtonTextColor,
        backgroundColor: ({darkButtonBackgroundColor}) => darkButtonBackgroundColor,
        border: `1px solid`,
        borderColor: ({postsHoverTextColor}) => postsHoverTextColor,
        borderRadius: '6px',
        padding: '10px',
        fontFamily: 'Inter-Regular',
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
        fontWeight: '400',
        textTransform: 'none',
        
        '&:hover': {
            backgroundColor: ({defaultButtonBackgroundColor}) => defaultButtonBackgroundColor,
            color: ({darkButtonTextColor}) => darkButtonTextColor,
            borderColor: ({postsHoverTextColor}) => postsHoverTextColor,
        },
        [theme.breakpoints.down('sm')]: {
            padding: '10px 10px',
            fontSize: ({descriptionTextFontSizeMobile}) => descriptionTextFontSizeMobile,
        },
    },

}));

const StyledButton = ({variant, text, width, to, clicked, disabled, buttonWithIcon, icon, type}) => {
    const {theme} = useTheme();
    const { fontSize } = useFontSize();
    const combinedTheme = {
        ...themes[theme],
        ...themes[fontSize]
    };

    const classes = useStyles(combinedTheme);
    const navigate = useNavigate();

    const getButtonStyle = () => {
        switch (variant) {
            case 'outlined':
                return classes.outlinedButton;
            case 'blackOutlined':
                return classes.blackOutlinedButton;
            case 'white':
                return classes.whiteButton;
            default:
                return classes.defaultButton;
        }
    };

    const handleClick = () => {
        navigate(to);
    };

    return (
        <>
            {buttonWithIcon ? (
                <Button
                    className={getButtonStyle()}
                    variant={variant}
                    style={{width: width}}
                    type={type}
                    onClick={clicked ? clicked : handleClick}
                    disabled={disabled}
                >
                    <img src={icon} alt="icon"/>
                </Button>
            ) : (
                <Button
                    className={getButtonStyle()}
                    variant={variant}
                    type={type}
                    style={{width: width}}
                    onClick={clicked ? clicked : handleClick}
                    disabled={disabled}
                >
                    {text}
                </Button>
            )}
        </>
    );
};

export default StyledButton;
