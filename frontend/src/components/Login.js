import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
    return {
        login: {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        },
        elements: {
            margin: "1vh 0 !important"
        }
    };
});

function Login(props) {

    const classes = useStyles();

    const handleKey = (e) => {
        if (e.keyCode === 13) {
            props.sendLogin();
        }
    }

    return (
        <div>
            <div className={classes.login}>
                <Typography className={classes.elements} variant="h3">Login:</Typography>
                <TextField className={classes.elements} spellCheck="false" label="Username" onChange={props.changeUsername} onKeyUp={handleKey}/>
                <Button className={classes.elements} color="secondary" variant="contained" onClick={props.sendLogin}>Login</Button>
            </div>
        </div>
    )
}

export default Login;
