import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
    return {
        message_oth: {
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            margin: "1rem 0 1rem 1rem",
            padding: "0.75rem 1.75rem 0.75rem 1rem",
            backgroundColor: theme.palette.secondary.main,
            boxShadow: () => `0 0 1rem ${theme.palette.secondary.light}`,
            borderRadius: "0 1.5rem 1rem 1.5rem",
            maxWidth: "50vw"
        },
        message_you: {
            alignSelf: "flex-end",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            margin: "1rem 1rem 1rem 0",
            padding: "0.75rem 1rem 0.75rem 1.75rem",
            backgroundColor: theme.palette.white.light,
            boxShadow: () => `0 0 1rem ${theme.palette.white.main}`,
            borderRadius: "1.5rem 0 1.5rem 1rem",
            maxWidth: "50vw"
        },
        user_oth: {
            marginBottom: "0.2rem",
            color: theme.palette.white.light,
            display: "inline-block",
            maxWidth: "6rem",
            overflow: "hidden",
            textOverflow: "ellipsis"
        },
        user_you: {
            marginBottom: "0.2rem",
            color: theme.palette.white.dark,
            display: "inline-block",
            wordBreak: "break-word",
            overflowWrap: "break-word"
        },
        content_oth: {
            marginLeft: "1rem",
            fontSize: "1.2rem",
            color: theme.palette.white.light,
            display: "inline-block",
            wordBreak: "break-word",
            overflowWrap: "break-word"
        },
        content_you: {
            marginRight: "1rem",
            fontSize: "1.2rem",
            color: theme.palette.white.dark,
            textAlign: "right",
            display: "inline-block",
            wordBreak: "break-word",
            overflowWrap: "break-word"
        }
    };
});

function ChatArea(props) {

    const classes = useStyles();

    return (
        <div className={(props.username === "Me") ? classes.message_you : classes.message_oth}>
            <Typography className={(props.username === "Me") ? classes.user_you : classes.user_oth} variant="caption">{props.username + ":"}</Typography>
            <Typography className={(props.username === "Me") ? classes.content_you : classes.content_oth}>{props.content}</Typography>
        </div>
    );
}

export default ChatArea;