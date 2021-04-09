import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';

import Message from './Message';

const useStyles = makeStyles((theme) => {
    console.log(theme.mixins.toolbar);
    return {
        chat: {
            position: "absolute",
            bottom: "12vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            height: `calc(100% - 20vh)`,
            width: "100%",
            [theme.breakpoints.down('md')]: {
                padding: 0,
                margin: 0
            },
            [theme.breakpoints.up('md')]: {
                width: "70%",
                padding: "0 15% 0 15%",
                margin: "0 auto 0 auto"
            },
            backgroundColor: theme.palette.white.light,
            overflow: "auto"
        }
    };
});

function ChatArea(props) {

    const classes = useStyles();

    var messagesEnd;

    useEffect(() => {
        messagesEnd.scrollIntoView({ behavior: "smooth" });
    });

    return (
        <div className={classes.chat}>
            {props.messageHist.map(m => {
                return <Message key={m.id}
                    username={(props.username === m.username) ? "Me" : m.username}
                    content={m.content}
                />;
            })}
            <div style={{ float:"left", clear: "both" }} ref={(el) => { messagesEnd = el; }}>
            </div>
        </div>
    );
}

export default ChatArea;
