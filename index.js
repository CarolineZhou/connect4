const express = require("express");
const socket_server = require("socket.io");
const fs = require("fs");
const random = require("nanoid");

const app = express();
const http = require("http").createServer(app);
const io = socket_server(http);

app.use(express.static(__dirname + "/files"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/html_files/index.html");
});

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/html_files/login.html");
});

app.get("/game", (req, res) => {
    res.sendFile(__dirname + "/html_files/game.html");
});

eval(fs.readFileSync("name.js") + "");

// ["game code", "oppo1", "oppo2"]
game_list = [];
num_game = 0;

io.on("connection", (socket) => {
    let name = generateName();

    socket.on("get new name", () => {
        socket.emit("new name", name);
    });

    socket.on("update name", (newName) => {
        // some logic
        name = newName;
        socket.emit("new name", name);
    });

    socket.on("get new game code", () => {
        let game = [];
        game[0] = random.nanoid(10);
        game[1] = socket.id;
        game[2] = -1;
        game_list[num_game] = game;
        socket.emit("new game code", game[0]);
        num_game++;
    });

    socket.on("join game", (code) => {
        // find the game in the list of games
        // add second player's socket id to it
        // emit message to start the game on both side
        for(let i = 0; i < num_game; i++){
            if(game_list[i][0] === code){
                
            }
        }
    });
});


http.listen(8000, () => {
    console.log("listening on port number 8000.");
});