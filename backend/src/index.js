const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;
const SocketIO = require("socket.io");



app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
    let ip = req.socket.remoteAddress.split(":");
    ip = (ip[ip.length - 1] === "1") ? "localhost" : ip[ip.length - 1];
    console.log(`${ip}: Made request to main endpoint`);
    res.status(200).sendFile("index.html");
});

app.get("*", (req, res) => {
    res.status(404).send("Endopoint not found");
});

const server = app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});



var users = [];
var messages = [];
var currentMessageId = 0;

const io = SocketIO(server, {cors: {origin: "*"}});

io.on("connection", (socket) => {
    console.log(`New connection from ${socket.id}`);

    socket.on("sv:login", (login) => {
        console.log(`User tried to log in as ${login.username}`);
        if (users.filter(user => user.username === login.username).length < 1 && login.username !== "") {
            let user = {
                id: socket.id,
                username: login.username
            }
            socket.credentials = user;
            users.push(user);
            socket.emit("cl:login", true);
            console.log(`Created username ${login.username}`);
        }
        else {
            if (login.username === "") {
                console.log(`Username can't be blank`);
            }
            else {
                console.log(`Username ${login.username} already exists`);
            }
            socket.emit("cl:login", false);
        }
    });

    socket.on("sv:message", (message) => {
        if (users.filter(user => user.username === message.username).length === 1 || message.username === "") {
            try {
                console.log(`[${currentMessageId}] ${socket.credentials.username}: ${message.content}`);
                message.id = currentMessageId;
                io.emit("cl:message", message);
                messages.push(message);
                ++currentMessageId;
            }
            catch {
                console.log(`${socket.id}: Ha sido forzado a desconectarse`);
                socket.emit("cl:login", false);
            }
        }
        else {
            socket.emit("cl:login", false);
        }
    });

    socket.on("sv:hist", (username) => {
        if (users.filter(user => user.username === username).length === 1) {
            console.log(`Enviando historial de mensajes a ${username}`);
            socket.emit("cl:hist", messages);
        }
        else {
            socket.emit("cl:login", false);
        }
    });
});