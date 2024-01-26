import React, {useEffect} from 'react';
import {
    Dialog,
    DialogContent, Icon,
    makeStyles,
    Button,
    Slide, IconButton,
} from '@material-ui/core';
import {ReactComponent as ArrowIcon} from "../../../assets/Icons/ArrowIcon.svg";
import {useTheme} from "../../../theme/themeContext";
import {themes} from "../../../theme/themeContext/themes";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
    dialog: {
        backgroundColor: 'transparent',
        overflow: 'hidden',
        '& .MuiDialog-paper': {
            backgroundColor: 'transparent',
        },
        '& .MuiPaper-elevation24': {
            boxShadow: 'none',
        },
        '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
        }
    },
    dialogContent: {
        display: 'flex',
        flexDirection: 'column',  // Изменено на 'column' для вертикального выравнивания
        alignItems: 'center',
        justifyContent: 'center',
        padding: theme.spacing(2),
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },
    dialogImage: {
        width: '100%',
        height: 'auto',
        maxWidth: '90%',
        maxHeight: '80vh',
        objectFit: 'contain',

    },
    arrowButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        position: 'absolute', // Позиция абсолютная
        top: '50%', // Отступ сверху
        transform: 'translateY(-50%)',
        [theme.breakpoints.down('sm')]: {
            position: 'fixed', // Позиция фиксированная
            bottom: '20px', // Отступ сверху
            right: '0',
            transform: 'translateY(0%)',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
        },
    },
    closeButton: {
        position: 'fixed', // Позиция фиксированная
        top: theme.spacing(2), // Отступ сверху
        right: theme.spacing(2), // Отступ справа
        color: ({galleryButtonBorderColor}) => galleryButtonBorderColor,
        '&:hover': {
            color: ({galleryHoverButtonBorderColor}) => galleryHoverButtonBorderColor,
        },
    },
    arrowButton: {
        backgroundColor: ({galleryButtonBackgroundColor}) => galleryButtonBackgroundColor,
        cursor: 'pointer',
        borderRadius: '0',
        minWidth: '40px',
        padding: '0',
        border: '1px solid',
        borderColor: ({galleryButtonBorderColor}) => galleryButtonBorderColor,
        display: 'flex',
        width: '40px',
        height: '40px',
        alignItems: 'center',
        '&:hover': {
            backgroundColor: ({galleryButtonBackgroundColor}) => galleryButtonBackgroundColor,
            borderColor: ({galleryHoverButtonBorderColor}) => galleryHoverButtonBorderColor,
            '& path': {
                stroke: ({galleryHoverButtonIconFill}) => galleryHoverButtonIconFill,
            },
        },
    },
    arrowIconLeft: {
        '& path': {
            stroke: ({galleryButtonIconFill}) => galleryButtonIconFill,
        }
    },
    arrowIconRight: {
        transform: 'rotate(180deg)',
        '& path': {
            stroke: ({galleryButtonIconFill}) => galleryButtonIconFill,
        }
    },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const FullscreenModal = ({open, onClose, imageSrc, onNext, onPrev}) => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'ArrowLeft') {
                onPrev();
            } else if (event.key === 'ArrowRight') {
                onNext();
            }
        };

        if (open) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [open, onPrev, onNext]);

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            onClose={onClose}
            scroll={'body'}
            fullWidth
            maxWidth="lg"
            className={classes.dialog}
        >
            <IconButton
                aria-label="close"
                className={classes.closeButton}
                onClick={onClose}
            >
                <CloseIcon/>
            </IconButton>
            <DialogContent className={classes.dialogContent}>
                <img
                    src={imageSrc}
                    alt="FullscreenImage"
                    className={classes.dialogImage}
                />
            </DialogContent>
            <div className={classes.arrowButtons}>
                <Button className={classes.arrowButton} onClick={onPrev}>
                    <Icon
                        component={ArrowIcon}
                        className={classes.arrowIconLeft}
                        src={ArrowIcon}
                        alt="ArrowIcon"
                    />
                </Button>
                <Button className={classes.arrowButton} onClick={onNext}>
                    <Icon
                        component={ArrowIcon}
                        className={classes.arrowIconRight}
                        src={ArrowIcon}
                        alt="ArrowIcon"
                    />
                </Button>
            </div>
        </Dialog>
    );
};

export default FullscreenModal;

