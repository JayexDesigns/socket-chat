import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Login(props) {

    return (
        <div>
            <div className="Login">
                <Typography variant="h3">Login:</Typography>
                <TextField spellCheck="false" label="Username" onChange={props.changeUsername}/>
                <Button color="secondary" variant="contained" onClick={props.sendLogin}>Login</Button>
            </div>
        </div>
    )
}

export default Login;
