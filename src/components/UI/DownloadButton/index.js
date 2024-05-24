import React from 'react';
import {ReactComponent as DownloadIcon} from '../../../assets/Icons/download-icon.svg';
import {Box, Icon, IconButton} from "@material-ui/core";
import {useTheme} from "../../../theme/themeContext";
import {themes} from "../../../theme/themeContext/themes";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {useFontSize} from "../FontSizeChange/FontSizeContext";

const useStyles = makeStyles((theme) => ({

    downloadButton: {
        padding: '20px',
        border: '2px solid',
        transition: 'all 0.5s ease-in-out',
        borderRadius: '6px',
        height: '100%',
        borderColor: ({downloadButtonBorderColorHover}) => downloadButtonBorderColorHover,
        display: 'flex',
        '& .MuiIconButton-label': {
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '20px',
        },
        '&:hover': {
            backgroundColor: 'transparent',
            borderColor: ({downloadButtonBorderColorHover}) => downloadButtonBorderColorHover,
            transition: 'all 0.3s ease-in-out',
            '& path': {
                transition: 'all 0.3s ease-in-out',
                fill: ({iconColorFillHover}) => iconColorFillHover,
            },
            '& $text': {
                transition: 'all 0.5s ease-in-out',
                color: ({downloadButtonBorderColorHover}) => downloadButtonBorderColorHover,
            }
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            padding: '10px',
        },
    },
    icon: {
        '& path': {
            transition: 'all 0.3s ease-in-out',
            fill: ({iconColorFillHover}) => iconColorFillHover,
        },
    },
    iconWithText: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    text: {
        color: ({textColor}) => textColor,
        fontFamily: 'Inter-Regular',
        fontSize: ({descriptionTextFontSize}) => descriptionTextFontSize,
        textTransform: 'capitalize',
        fontWeight: '400',
        textAlign: 'left',
        transition: 'all 0.5s ease-in-out',
        [theme.breakpoints.down('xs')]: {
            fontSize: ({descriptionTextFontSizeMobile}) => descriptionTextFontSizeMobile,
        },
    },
}));

const DownloadButton = ({pdfUrl, fullWidth}) => {
    const {theme} = useTheme();
    const { fontSize } = useFontSize();
    const combinedTheme = {
        ...themes[theme],
        ...themes[fontSize]
    };

    const classes = useStyles(combinedTheme);

    return (
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
            <IconButton className={classes.downloadButton} style={{ width: fullWidth ? fullWidth : '355px' }}>
                <Typography variant="h6" className={classes.text}>
                    {pdfUrl.split('/').pop()}
                </Typography>
                <Box className={classes.iconWithText}>
                    <Icon
                        component={DownloadIcon}
                        className={classes.icon}
                        src={DownloadIcon}
                    />
                    <Typography variant="h6" className={classes.text}>
                        Pobierz
                    </Typography>
                </Box>
            </IconButton>
        </a>
    );
};

export default DownloadButton;

