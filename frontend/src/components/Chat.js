import React, { useState, useEffect } from 'react';

import ChatHeader from './ChatHeader';
import ChatArea from './ChatArea';
import ChatSend from './ChatSend';

function Chat(props) {

    const [message, setMessage] = useState("");
    const [messageHist, setMessageHist] = useState([]);
    const [outdated, setOutdated] = useState(true);

    useEffect(() => {
        props.wsocket.on("cl:message", (res) => {
            setMessageHist([...messageHist, res]);
        });
        props.wsocket.on("cl:hist", (res) => {
            setMessageHist(res);
        });
        return () => {props.wsocket.off()};
    }, [messageHist, props.wsocket]);

    useEffect(() => {
        if (outdated === true) {
            props.wsocket.emit("sv:hist", props.username);
            setOutdated(false);
        }
    }, [outdated, props.wsocket, props.username]);

    const changeMessage = (e) => {
        setMessage(e.target.value);
    }

    const sendMessage = () => {
        props.sendMessage(message);
        setMessage("");
    }

    return (
        <div className="Chat">
            <ChatHeader username={props.username}/>
            <ChatArea messageHist={messageHist} username={props.username}/>
            <ChatSend message={message} changeMessage={changeMessage} sendMessage={sendMessage}/>
        </div>
    );
}

export default Chat;
