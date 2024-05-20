import React, {useState, useRef, useEffect} from 'react';
import {IconButton, Popover, makeStyles, createStyles, Icon} from '@material-ui/core';
import {ReactComponent as WCAGIcon} from "../../../assets/Icons/wcag-logo.svg";
import {useTheme} from "../../../theme/themeContext";
import {themes} from "../../../theme/themeContext/themes";
import PopoverContent from "./PopoverContent";

const useStyles = makeStyles((theme) =>
    createStyles({
        wcagIconButton: {
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            //marginRight: '20px',
            "& path": {
                transition: '300ms ease-in-out',
                fill: ({iconColorFill}) => iconColorFill,
            },
            '&:hover': {
                backgroundColor: 'transparent',
                "& path": {
                    transition: '300ms ease-in-out',
                    fill: ({iconColorFillHover}) => iconColorFillHover,
                },
            },
        },
        icon: {},
        paper: {
            padding: '20px',
            marginTop: '40px',
            boxShadow: 'none',
            borderRadius: '10px',
            border: '1px solid',
            borderColor: ({inputBorderColor}) => inputBorderColor,
            backgroundColor: ({backgroundColor}) => backgroundColor,
        },
    })
);

const SettingsDrawer = () => {
    const {theme, toggleTheme} = useTheme();
    const classes = useStyles(themes[theme]);
    const [anchorEl, setAnchorEl] = useState(null);
    const buttonRef = useRef(null);

    const handlePopoverOpen = () => {
        setAnchorEl(buttonRef.current);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const handleButtonClick = () => {
        if (open) {
            handlePopoverClose();
        } else {
            handlePopoverOpen();
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (buttonRef.current && !buttonRef.current.contains(event.target)) {
                handlePopoverClose();
            }
        };

        document.body.addEventListener('click', handleClickOutside);

        return () => {
            document.body.removeEventListener('click', handleClickOutside);
        };
    }, [buttonRef]);

    return (
        <>
            <IconButton
                ref={buttonRef}
                onClick={handleButtonClick}
                className={classes.wcagIconButton}
            >
                <Icon
                    component={WCAGIcon}
                    className={classes.icon}
                    src={WCAGIcon}
                />
            </IconButton>
            <Popover
                id="mouse-over-popover"
                classes={{
                    paper: classes.paper,
                }}
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                onClose={handlePopoverClose}
            >
                <PopoverContent toggleThemeClickEvent={toggleTheme}/>
            </Popover>
        </>
    );
};

export default SettingsDrawer;



