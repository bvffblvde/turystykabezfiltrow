import React from 'react';
import {makeStyles, createStyles, Button, Box} from '@material-ui/core';
import FontSizeButtons from "../FontSizeChange";
import {themes} from "../../../theme/themeContext/themes";
import {useTheme} from "../../../theme/themeContext";

const useStyles = makeStyles((theme) =>
    createStyles({
        wcagButton: {
            padding: 0,
            fontFamily: 'Inter-Regular',
            fontSize: '20px',
            fontWeight: 400,
            color: ({postsTextColor}) => postsTextColor,
            transition: "all 0.3s ease-out",
            border: 'none',
            textTransform: 'none',
            backgroundColor: 'transparent',
            cursor: 'pointer',
            '&:hover': {
                backgroundColor: 'transparent',
                color: ({postsHoverTextColor}) => postsHoverTextColor,
            }
        },
        boxWrapper: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
        }
    })
);

const PopoverContent = ({toggleThemeClickEvent, paddingBottom}) => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);

    return (
        <Box className={classes.boxWrapper} style={{paddingBottom: paddingBottom}}>
            <Box>
                <FontSizeButtons/>
            </Box>
            <Box>
                <Button onClick={toggleThemeClickEvent} className={classes.wcagButton}>
                    Wersja kontrastowa
                </Button>
            </Box>
            <Box>
                <Button className={classes.wcagButton} as="a" href="/declaracja-dostepnosci">
                    Deklaracja dostępności cyfrowej
                </Button>
            </Box>
        </Box>
    );
};

export default PopoverContent;
