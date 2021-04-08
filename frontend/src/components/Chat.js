import React, { useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

function Chat(props) {

    const [message, setMessage] = useState("");
    const [messageHist, setMessageHist] = useState([]);

    useEffect(() => {
        props.wsocket.on("cl:message", (res) => {
            setMessageHist([...messageHist, res]);
        });
        return () => {props.wsocket.off()};
    }, [messageHist, props.wsocket]);

    const changeMessage = (e) => {
        setMessage(e.target.value);
    }

    const sendMessage = () => {
        props.sendMessage(message);
    }

    const ownMessageStyle = {
        float: "right"
    }

    const otherMessageStyle = {
        float: "left"
    }

    return (
        <div>
            <div className="Chat">
                <Typography>Logged In As {props.username}</Typography>
                <div className="chatArea">
                    {messageHist.map(m => {
                        return <Typography style={(m.username === props.username) ? ownMessageStyle : otherMessageStyle} key={m.id}>{m.username}: {m.content}</Typography>;
                    })}
                </div>
                <TextField label="Message" onChange={changeMessage}/>
                <Button color="primary" variant="contained" onClick={sendMessage}>Send</Button>
            </div>
        </div>
    );
}

export default Chat;
