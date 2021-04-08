import React, { useState, useEffect} from 'react';
import io from 'socket.io-client';
import Login from './components/Login';
import Chat from './components/Chat';

const socket = io.connect('http://192.168.0.181:5000', {transports: ['websocket']});

function App() {

    const [username, setUsername] = useState("");
    const [logged, setLogged] = useState(false);

    useEffect(() => {
        socket.on("cl:login", (res) => {
            if (res === true) {
                setLogged(true);
            }
            else if (res === false) {
                console.log("Login failed");
                setLogged(false);
            }
        });
    });

    const changeUsername = (e) => {
        setUsername(e.target.value);
    }

    const sendLogin = () => {
        socket.emit("sv:login", {username: username});
    }

    const sendMessage = (message) => {
        socket.emit("sv:message", {username: username, content: message});
    }

    return (
        <div className="App">
            {(logged) ? <Chat wsocket={socket} sendMessage={sendMessage} username={username}></Chat> : <Login changeUsername={changeUsername} sendLogin={sendLogin}></Login>}
        </div>
    )
}

export default App
