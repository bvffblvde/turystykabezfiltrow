// import React from 'react';
// import {Radio, RadioGroup, FormControlLabel, makeStyles, createStyles, Button} from '@material-ui/core';
// import {useTheme} from "../../../theme/themeContext";
// import {themes} from "../../../theme/themeContext/themes";
// import {useFontSize} from "./FontSizeContext";
//
// const useStyles = makeStyles((theme) =>
//     createStyles({
//         buttonWrapper: {
//             display: 'flex',
//             flexDirection: 'row',
//             gap: '12px',
//         },
//         radioLabel: {
//             cursor: 'pointer', // Делаем метку радио кликабельной
//             fontFamily: 'Inter-Regular',
//             fontSize: '20px',
//             fontWeight: 400,
//             transition: "all 0.3s ease-out",
//             color: ({postsTextColor}) => postsTextColor,
//             padding: '0',
//             margin: '0',
//             minWidth: '0',
//             backgroundColor: 'transparent',
//             borderRadius: '0',
//             '&:hover': {
//                 transition: "all 0.3s ease-out",
//                 backgroundColor: 'transparent',
//                 color: ({postsHoverTextColor}) => postsHoverTextColor,
//             },
//             '& .MuiButton-root:hover': {
//                 backgroundColor: 'transparent',
//             }
//         },
//         radio: {
//             display: 'none', // Скрываем радио-кнопку
//         },
//         test: {
//             fontSize: ({fontSizeTest}) => fontSizeTest,
//         }
//     })
// );
//
// const FontSizeButtons = () => {
//     const {theme} = useTheme();
//     const classes = useStyles(themes[theme]);
//     const {fontSize, toggleFontSize} = useFontSize();
//
//
//     return (
//         <div>
//             <Button onClick={toggleFontSize}>Change font size</Button>
//             <p className={classes.test} style={{ fontSize: fontSize }}>test</p>
//         </div>
//     );
// };
//
// export default FontSizeButtons;

import React from 'react';
import { Radio, RadioGroup, FormControlLabel, makeStyles, createStyles } from '@material-ui/core';
import { useTheme } from "../../../theme/themeContext";
import { themes } from "../../../theme/themeContext/themes";
import { useFontSize } from "./FontSizeContext";

const useStyles = makeStyles((theme) =>
    createStyles({
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
            '&.Mui-checked': {
                color: ({ postsHoverTextColor }) => postsHoverTextColor,
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
    const { fontSize, setFontSize } = useFontSize();

    const handleChange = (event) => {
        setFontSize(event.target.value);
    };

    return (
        <RadioGroup className={classes.buttonWrapper} value={fontSize} onChange={handleChange}>
            <FormControlLabel
                value="defaultSize"
                control={<Radio color="primary" className={classes.radio} />}
                label="A"
                className={`${classes.radioLabel} ${fontSize === 'defaultSize' ? 'Mui-checked' : ''}`} // Добавляем класс для метки радио
            />
            <FormControlLabel
                value="mediumSize"
                control={<Radio color="primary" className={classes.radio} />}
                label="A+"
                className={`${classes.radioLabel} ${fontSize === 'mediumSize' ? 'Mui-checked' : ''}`} // Добавляем класс для метки радио
            />
            <FormControlLabel
                value="largeSize"
                control={<Radio color="primary" className={classes.radio} />}
                label="A++"
                className={`${classes.radioLabel} ${fontSize === 'largeSize' ? 'Mui-checked' : ''}`} // Добавляем класс для метки радио
            />
        </RadioGroup>
    );
};

export default FontSizeButtons;


