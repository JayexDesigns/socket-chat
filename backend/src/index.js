const path = require("path");
const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
    let ip = req.socket.remoteAddress.split(":");
    ip = (ip[ip.length - 1] === "1") ? "localhost" : ip[ip.length - 1];
    console.log(`${ip}: Made request to main endpoint`);
    res.status(200).sendFile("index.html");
});

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});