import React, {useState} from 'react';
import {Box, Snackbar, TextField, Typography} from '@material-ui/core';
import StyledButton from '../StyledButton';
import {makeStyles} from '@material-ui/core/styles';
import {useTheme} from "../../../theme/themeContext";
import {themes} from "../../../theme/themeContext/themes";
import CommentButton from "../CommentButton";

const useStyles = makeStyles((theme) => ({
    commentBoxWrapper: {
        backgroundColor: ({backgroundColor}) => backgroundColor,
        borderRadius: '10px',
        padding: '20px 10px',
        gap: '20px',
        border: '1px solid transparent',
        borderColor: ({inputBorderColor}) => inputBorderColor,
        '& p': {
            margin: '0',
        }
    },
    addCommentBoxWrapper: {
        backgroundColor: ({backgroundColor}) => backgroundColor,
        borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 10px',
        gap: '20px',
        border: '1px solid transparent',
        borderColor: ({inputBorderColor}) => inputBorderColor,
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
        }
    },
    commentsWrapper: {
        paddingRight: '10px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        paddingBottom: '20px',
    },
    userCommentDate: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    authorName: {
        fontFamily: 'Inter-Regular',
        fontSize: '16px',
        fontWeight: 700,
        color: ({textColor}) => textColor,
    },
    commentText: {
        fontFamily: 'Inter-Regular',
        fontSize: '16px',
        fontWeight: 400,
        color: ({textColor}) => textColor,
    },
    date: {
        fontFamily: 'Inter-Regular',
        fontSize: '16px',
        fontWeight: 400,
        opacity: '0.6',
        color: ({textColor}) => textColor,
        marginBottom: '12px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '12px',
            marginBottom: '20px',
        },
    },
    textField: {
        width: '100%',
    },

    textFieldArea: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: '20px',

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
    },
    authorDataWrapper: {
        display: 'flex',
        flexDirection: 'row',
        gap: '20px',
        justifyContent: 'space-between',
    },
    commentLayout: {
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: '20px',
    },
    line: {
        width: '3px',
        backgroundColor: ({addCommentColor}) => addCommentColor,
    },
    replyToBox: {
        display: 'flex',
        flexDirection: 'row',
        gap: '10px',
        marginBottom: '16px',
    },
    replyToText: {
        fontFamily: 'Inter-Regular',
        fontSize: '16px',
        color: ({textColor}) => textColor,
        opacity: '0.6',
    }

}));


const CommentsSection = ({comments, postId}) => {
    const {theme} = useTheme();
    const classes = useStyles(themes[theme]);
    const [newComment, setNewComment] = useState('');
    const [authorName, setAuthorName] = useState('');
    const [authorEmail, setAuthorEmail] = useState('');
    const [replyAuthorName, setReplyAuthorName] = useState('');
    const [replyAuthorEmail, setReplyAuthorEmail] = useState('');
    const [replyComment, setReplyComment] = useState('');
    const [replyToCommentId, setReplyToCommentId] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false); // Состояние для управления отображением snackbar


    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    };

    const handleAuthorNameChange = (event) => {
        setAuthorName(event.target.value);
    };

    const handleAuthorEmailChange = (event) => {
        setAuthorEmail(event.target.value);
    };

    const handleReplyAuthorNameChange = (event) => {
        setReplyAuthorName(event.target.value);
    };

    const handleReplyAuthorEmailChange = (event) => {
        setReplyAuthorEmail(event.target.value);
    };

    const handleReplyCommentChange = (event) => {
        setReplyComment(event.target.value);
    };

    const handleReply = (commentId) => {
        setReplyToCommentId(commentId);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const requestBody = {
                'comment_post_ID': postId,
                'comment': newComment,
                'author': authorName,
                'email': authorEmail,
            };

            if (replyToCommentId !== null) {
                requestBody['comment_parent'] = replyToCommentId;
                requestBody['author'] = replyAuthorName;
                requestBody['email'] = replyAuthorEmail;
                requestBody['comment'] = replyComment;
            }

            const response = await fetch('https://weckwerthblog.wpcomstaging.com/wp-comments-post.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(requestBody).toString(),
            });

            if (response.ok) {
                console.log('Comment added successfully');
                setReplyToCommentId(null);
                setSnackbarOpen(true); // Показываем snackbar после успешной отправки комментария
                setNewComment('');
                setAuthorName('');
                setAuthorEmail('');
                setReplyAuthorName('');
                setReplyAuthorEmail('');
                setReplyComment('');
            } else {
                console.error('Failed to add comment');
                setReplyToCommentId(null);
                setSnackbarOpen(true); // Показываем snackbar после успешной отправки комментария
                setNewComment('');
                setAuthorName('');
                setAuthorEmail('');
                setReplyAuthorName('');
                setReplyAuthorEmail('');
                setReplyComment('');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            setReplyToCommentId(null);
            setSnackbarOpen(true); // Показываем snackbar после успешной отправки комментария
            setNewComment('');
            setAuthorName('');
            setAuthorEmail('');
            setReplyAuthorName('');
            setReplyAuthorEmail('');
            setReplyComment('');
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    return (
        <Box className={classes.commentsWrapper}>
            <Box className={classes.addCommentBoxWrapper}>
                <Box className={classes.textFieldArea}>
                    <Box className={classes.authorDataWrapper}>
                        <TextField
                            className={classes.textField}
                            value={authorName}
                            type="text"
                            onChange={handleAuthorNameChange}
                            label="Twoje imię"
                            variant="outlined"
                        />
                        <TextField
                            className={classes.textField}
                            value={authorEmail}
                            onChange={handleAuthorEmailChange}
                            type="email"
                            label="Twój adres e-mail"
                            variant="outlined"
                        />
                    </Box>
                    <TextField
                        className={classes.textField}
                        value={newComment}
                        onChange={handleCommentChange}
                        label="Zostaw swoją opinię na temat tego artykułu"
                        type="text"
                        variant="outlined"
                        multiline
                        rows={6}
                    />
                </Box>
                <StyledButton
                    text="Napisz recenzję"
                    width="100%"
                    clicked={handleSubmit}
                    disabled={!newComment || !authorName || !authorEmail}
                />
            </Box>
            <Box className={classes.commentLayout}>
                {comments.map((comment) => (
                    <div key={comment?.id ?? ''} className={classes.commentBoxWrapper}>
                        <Box className={classes.userCommentDate}>
                            <Typography
                                variant="body1"
                                dangerouslySetInnerHTML={{__html: comment?.author_name}}
                                className={classes.authorName}
                            />
                            <Typography variant="h4" className={classes.date}>
                                {new Date(comment?.date).toLocaleDateString('pl-PL', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric',
                                })}
                            </Typography>
                        </Box>
                        {comment?.parent !== 0 && ( // Проверяем, является ли текущий комментарий ответом
                            <Box className={classes.replyToBox}>
                                <div className={classes.line}/>
                                <Typography
                                    dangerouslySetInnerHTML={{__html: comments.find((c) => c.id === comment.parent)?.content.rendered}}
                                    className={classes.replyToText}/>
                            </Box>
                        )}
                        <Typography
                            variant="body1"
                            dangerouslySetInnerHTML={{__html: comment?.content.rendered}}
                            className={classes.commentText}
                        />
                        <CommentButton
                            text="Odpowiedź"
                            clicked={() => handleReply(comment?.id)}
                        />
                        {replyToCommentId === comment?.id && (
                            <Box className={classes.textFieldArea} style={{marginTop: '20px'}}>
                                <Box className={classes.authorDataWrapper}>
                                    <TextField
                                        className={classes.textField}
                                        value={replyAuthorName}
                                        type="text"
                                        onChange={handleReplyAuthorNameChange}
                                        label="Twoje imię"
                                        variant="outlined"
                                    />
                                    <TextField
                                        className={classes.textField}
                                        value={replyAuthorEmail}
                                        onChange={handleReplyAuthorEmailChange}
                                        type="email"
                                        label="Twój adres e-mail"
                                        variant="outlined"
                                    />
                                </Box>
                                <TextField
                                    className={classes.textField}
                                    value={replyComment}
                                    onChange={handleReplyCommentChange}
                                    label="Zostaw swoją odpowiedź"
                                    type="text"
                                    variant="outlined"
                                    multiline
                                    rows={4}
                                />
                                <StyledButton
                                    text="Odpowiedz"
                                    width="100%"
                                    clicked={handleSubmit}
                                    disabled={!replyComment || !replyAuthorName || !replyAuthorEmail}
                                />
                            </Box>
                        )}
                    </div>
                ))}
            </Box>
            <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Box
                    sx={{
                        width: '100%',
                        bgcolor: '#4CAF50',
                        color: 'white',
                        fontFamily: 'Inter-Regular',
                        fontSize: '16px',
                        textAlign: 'center',
                        p: 2,
                        borderRadius: '6px',
                    }}
                    elevation={6}
                >
                    Twój komentarz został dodany pomyślnie
                </Box>
            </Snackbar>
        </Box>
    );
};

export default CommentsSection;



