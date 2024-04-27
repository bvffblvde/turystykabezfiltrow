import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    titleSection: {
        fontFamily: 'Inter-Bold',
        fontSize: '60px',
        fontWeight: '500',
        color: ({textColor}) => textColor,
        textAlign: 'center',
        marginBottom: '32px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '20px',
            marginBottom: '20px',
        }
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

export default useStyles;
