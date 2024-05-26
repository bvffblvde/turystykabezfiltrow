import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    titleSection: {
        fontFamily: 'Inter-Bold',
        fontSize: ({titleSectionFontSize}) => titleSectionFontSize,
        fontWeight: '500',
        color: ({textColor}) => textColor,
        textAlign: 'center',
        marginBottom: '32px',
        [theme.breakpoints.down('sm')]: {
            fontSize: ({titleSectionFontSizeMobile}) => titleSectionFontSizeMobile,
            marginBottom: '20px',
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default useStyles;
