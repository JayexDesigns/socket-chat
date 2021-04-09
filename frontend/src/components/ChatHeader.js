import React from 'react';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
    return {
        appbar: {
            alignItems: "flex-end",
            justifyContent: "center",
            backgroundColor: theme.palette.primary.main,
            height: "8vh"
        },
        toolbar: theme.mixins.toolbar,
        text: {
            display: "inline-block",
            whiteSpace: "nowrap",
            maxWidth: "18rem",
            overflow: "hidden",
            textOverflow: "ellipsis"
        },
        user: {
            color: theme.palette.secondary.light
        }
    };
});

function ChatHeader(props) {

    const classes = useStyles();

    return (
        <div>
            <AppBar className={classes.appbar}>
                <Toolbar>
                    <Typography className={classes.text} variant="h5">Logged in as <b className={classes.user}>{props.username}</b></Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbar}></div>
        </div>
    );
}

export default ChatHeader;
