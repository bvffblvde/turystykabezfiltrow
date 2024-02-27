import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import {useTheme} from '../../../theme/themeContext';
import {themes} from "../../../theme/themeContext/themes";
import {Box, Button, Icon} from "@material-ui/core";
import {ReactComponent as ArrowLine} from "../../../assets/Icons/arrowLine.svg";


const useStyles = makeStyles((theme) => ({
    h4: {
        color: ({addCommentColor}) => addCommentColor,
        transition: "all 0.5s ease-out",
        fontSize: '16px',
        textTransform: 'capitalize',
        fontWeight: '700',
        fontFamily: 'Inter-Regular',
    },
    button: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: '0',
        margin: '0',
        marginTop: '20px',
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        marginRight: '10px',
        '& path': {
            fill: ({addCommentColor}) => addCommentColor,
        },
    }
}));

const CommentButton = ({ text}) => {
    const { theme } = useTheme();
    const classes = useStyles(themes[theme]);


    return (
        <Button className={classes.button}>
            <Box>
                <Icon
                    component={ArrowLine}
                    className={classes.icon}
                    src={ArrowLine}
                />
            </Box>
            <Typography variant="h4" className={classes.h4} id="myElementId" dangerouslySetInnerHTML={{__html: text}}/>
        </Button>
    );
};

export default CommentButton;