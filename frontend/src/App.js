import React, { useState, useEffect} from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import io from 'socket.io-client';

import Login from './components/Login';
import Chat from './components/Chat';



const socket = io.connect('http://localhost', {transports: ['websocket']});



const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#dc527c",
            main: "#ff0066"
        },
        secondary: {
            light: "#fed883",
            main: "#febe40"
        },
        white: {
            light: "#ffffff",
            main: "#d0d0d0",
            dark: "#1a1a1a"
        }
    }
});



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
        if (message !== "") {
            socket.emit("sv:message", {username: username, content: message});
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                {(logged) ? <Chat wsocket={socket} sendMessage={sendMessage} username={username}></Chat> : <Login changeUsername={changeUsername} sendLogin={sendLogin}></Login>}
            </div>
        </ThemeProvider>
    )
}

export default App
