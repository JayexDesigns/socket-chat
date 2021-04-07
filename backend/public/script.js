const socket = io();


var loginUsername = document.getElementsByTagName("input")[0];
var loginButton = document.getElementsByTagName("input")[1];
var loginOutput = document.getElementById("loginOutput");

var messageField = document.getElementsByTagName("input")[2];
var messageButton = document.getElementsByTagName("input")[3];
var messagesOutput = document.getElementById("messagesOutput");


loginButton.addEventListener('click', () => {
    let username = loginUsername.value;
    if (username !== "") {
        socket.emit("sv:login", {username: username});
    }
});

messageButton.addEventListener('click', () => {
    let username = loginUsername.value;
    let message = messageField.value;
    if (message !== "") {
        socket.emit("sv:message", {username: username, content: message});
    }
});





socket.on("cl:login", (res) => {
    loginOutput.innerText = res;
});

socket.on("cl:message", (res) => {
    messagesOutput.value += `${res.username}: ${res.content}\n`;
});