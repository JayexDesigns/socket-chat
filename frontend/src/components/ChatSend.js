import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
    return {
        sendSection: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            height: "13vh",
            backgroundColor: theme.palette.white.light,
            borderTopWidth: "0.2rem",
            borderTopStyle: "solid",
            borderTopColor: theme.palette.primary.main
        },
        send: {
            display: "flex",
            alignItems: "center",
            [theme.breakpoints.down('md')]: {
                width: "85%"
            },
            [theme.breakpoints.up('md')]: {
                width: "50%",
                maxWidth: "600px"
            }
        },
        sendButton: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.white.light,
            marginLeft: "1rem",
            "&:hover": {
                backgroundColor: theme.palette.secondary.light
            }
        }
    };
});

function ChatSend(props) {

    const classes = useStyles();

    const [content, setContent] = useState("");

    useEffect(() => {
        setContent(props.message);
    }, [props.message]);

    const handleKey = (e) => {
        if (e.keyCode === 13) {
            props.sendMessage();
        }
    }

    return (
        <div className={classes.sendSection}>
            <div className={classes.send}>
                <TextField spellCheck="false" fullWidth onChange={props.changeMessage} onKeyDown={handleKey} value={content} color="secondary"/>
                <IconButton className={classes.sendButton} onClick={props.sendMessage}><SendIcon/></IconButton>
            </div>
        </div>
    );
}

export default ChatSend;
