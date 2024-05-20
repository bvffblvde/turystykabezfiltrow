import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    boxWrapper: {
        display: 'flex',
        height: '70vh',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '32px',
    },
    title: {
        fontFamily: 'Inter-Bold',
        fontSize: '60px',
        fontWeight: 700,
        textAlign: "center",
        color: ({textColor}) => textColor,
        [theme.breakpoints.down('sm')]: {
            fontSize: '32px',
            fontWeight: 700,
            marginBottom: '16px',
        },
    },

    subTitle: {
        fontFamily: 'Inter-Regular',
        fontSize: '20px',
        fontWeight: 400,
        textAlign: "center",
        color: ({textColor}) => textColor,
        width: '60%',
        [theme.breakpoints.down('sm')]: {
            fontSize: '16px',
            width: '100%',
            marginBottom: '16px',
        }
    },
}));

export default useStyles;