const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
app.use(cors());

const server = http.createServer(app);

const io = new Server(server,{
    cors: {
        origin: "http://192.168.42.33:3000",
        methods: ["GET", "POST" ],
    },
});

io.on("connection", (socket)=>{
    console.log("User Connected : ",socket.id);

        // JOINING A ROOM
    socket.on("join_room", (roomID) => {
        socket.join(roomID);
        console.log(`User with ID: ${socket.id} joined Room: ${roomID}`);
    });

    socket.on("send_message", (data)=>{
        socket.to(data.room).emit("receive_message", data );
    });
        // LEAVING THE SERVER
    socket.on("disconnect", ()=>{
        console.log("User Disconnected : ", socket.id)
    });
});


server.listen(3001, ()=> {
    console.log("Server Running!");
});