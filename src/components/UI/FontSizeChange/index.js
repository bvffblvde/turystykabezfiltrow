import React from 'react';
import { Radio, RadioGroup, FormControlLabel, makeStyles, createStyles } from '@material-ui/core';
import { useTheme } from "../../../theme/themeContext";
import { themes } from "../../../theme/themeContext/themes";
import { useFontSize } from "./FontSizeContext";

const useStyles = makeStyles((theme) =>
    createStyles({
        button: {

        },
        buttonWrapper: {
            display: 'flex',
            flexDirection: 'row',
            gap: '12px',
        },
        radioLabel: {
            cursor: 'pointer', // Делаем метку радио кликабельной
            fontFamily: 'Inter-Regular',
            fontSize: '20px',
            fontWeight: 400,
            transition: "all 0.3s ease-out",
            color: ({ postsTextColor }) => postsTextColor,
            padding: '0',
            margin: '0',
            minWidth: '0',
            backgroundColor: 'transparent',
            borderRadius: '0',
            '&:hover': {
                transition: "all 0.3s ease-out",
                backgroundColor: 'transparent',
                color: ({ postsHoverTextColor }) => postsHoverTextColor,
            },
            '& .MuiButton-root:hover': {
                backgroundColor: 'transparent',
            }
        },
        radio: {
            display: 'none', // Скрываем радио-кнопку
        },
    })
);

const FontSizeButtons = () => {
    const { theme } = useTheme();
    const classes = useStyles(themes[theme]);
    const { fontSize, updateFontSize, resetFontSize } = useFontSize();

    const handleChange = (event) => {
        const value = event.target.value;
        resetFontSize(); // Сбрасываем размер к значению по умолчанию
        updateFontSize(parseInt(value)); // Устанавливаем новое значение
    };

    return (
        <RadioGroup className={classes.buttonWrapper} value={fontSize.toString()} onChange={handleChange}>
            <FormControlLabel
                value="default"
                control={<Radio color="primary" className={classes.radio} />}
                label="A"
                className={classes.radioLabel} // Добавляем класс для метки радио
            />
            <FormControlLabel
                value="2"
                control={<Radio color="primary" className={classes.radio} />}
                label="A+"
                className={classes.radioLabel} // Добавляем класс для метки радио
            />
            <FormControlLabel
                value="4"
                control={<Radio color="primary" className={classes.radio} />}
                label="A++"
                className={classes.radioLabel} // Добавляем класс для метки радио
            />
        </RadioGroup>
    );
};

export default FontSizeButtons;





