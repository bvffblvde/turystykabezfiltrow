import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      width: '80%',
        margin: 'auto',
        marginBottom: '100px',
    },
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
    buttonWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: '20px',
        marginBottom: '32px',
    },
    lineWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: '0.5',
        marginBottom: '32px',
    },
    line: {
        height: '1px',
        width: '100%',
        border: '1px solid',
        borderColor: ({defaultBorderColor}) => defaultBorderColor,
    },
    subButtonText: {
        fontFamily: 'Inter-Regular',
        fontSize: '16px',
        fontWeight: '400',
        color: ({textColor}) => textColor,
    },
    subTitle: {
        fontFamily: 'Inter-Bold',
        fontSize: '24px',
        fontWeight: '500',
        color: ({textColor}) => textColor,
        textAlign: 'left',
        marginBottom: '32px',
    },
    formSection: {
        marginBottom: '60px',
        '& input.MuiInputBase-input': {
            color: ({contactFormInputTextColor}) => contactFormInputTextColor,
        },
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            borderColor: ({defaultBorderColor}) => defaultBorderColor,
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: ({hoverBorderColor}) => hoverBorderColor,
        },
        '& .MuiFormLabel-root': {
            color: ({contactFormInputTextColor}) => contactFormInputTextColor,
        },
        '& .MuiFormLabel-root.Mui-focused': {
            color: ({contactFormInputTextColorHover}) => contactFormInputTextColorHover,
        },
        '& input:-webkit-autofill input:-webkit-autofill:hover input:-webkit-autofill:focus input:-webkit-autofill:active': {
            '-webkit-box-shadow': '0 0 0 30px red inset !important',
        },
        '& input:-webkit-autofill': {
            '-webkit-text-fill-color': ({contactFormInputTextColor}) => contactFormInputTextColor,
            '-webkit-box-shadow': ({sectionWrapperBackgroundColor}) => `0 0 0 30px ${sectionWrapperBackgroundColor} inset`,
        },
        '& .MuiIconButton-label': {
            color: ({defaultBorderColor}) => defaultBorderColor,
            '&:hover': {
                backgroundColor: 'transparent',
                color: ({hoverBorderColor}) => hoverBorderColor,
            },
            '&:focus': {
                backgroundColor: 'transparent',
                color: ({hoverBorderColor}) => hoverBorderColor,
            },
            '&:active': {
                backgroundColor: 'transparent',
                color: ({hoverBorderColor}) => hoverBorderColor,
            },
            '&:checked': {
                backgroundColor: 'transparent',
                color: ({hoverBorderColor}) => hoverBorderColor,
            },
            '&:selected': {
                backgroundColor: 'transparent',
                color: ({hoverBorderColor}) => hoverBorderColor,
            }
        },
        [theme.breakpoints.down('sm')]: {
            width: '100%',
        }
    },
    radioSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        backgroundColor: ({sectionWrapperBackgroundColor}) => sectionWrapperBackgroundColor,
        boxShadow: '0px 0px 16px 0px #0000000f',
        padding: '10px',
        borderRadius: '10px',
        border: '1px solid',
        borderColor: ({defaultBorderColor}) => defaultBorderColor,
        marginBottom: '20px',
    },
    deliveryWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'Inter-Bold',
        fontSize: '16px',
        fontWeight: '700',
        color: ({textColor}) => textColor,
    },
    costCardWrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        borderRadius: '10px',
        border: '1px solid',
        borderColor: ({defaultBorderColor}) => defaultBorderColor,
        backgroundColor: ({costCardBackgroundColor}) => costCardBackgroundColor,
        padding: '20px',
        marginBottom: '20px',
    },
    priceInfoSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'Inter-Bold',
        fontSize: '16px',
        fontWeight: '700',
        color: ({textColor}) => textColor,
    },
    priceInfoTitle: {
        fontFamily: 'Inter-Bold',
        fontSize: '24px',
        fontWeight: '500',
        textAlign: 'center',
        color: ({textColor}) => textColor,
    }
}));

export default useStyles;