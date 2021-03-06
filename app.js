const express = require("express");
const socket = require("socket.io");

const app = express();
app.use(express.static("public"));

let port = process.env.PORT || 3000;
let server = app.listen(port, () => {
  console.log("Listening to port " + port);
});
// var port_number = server.listen(process.env.PORT || 3000);
// app.listen(port_number);
let io = socket(server);

io.on("connection", (socket) => {
  console.log("Made Connection");
  //Received data
  socket.on("beginPath", (data) => {
    //data-|>data from frontend
    //Now transfer data to all connected computers
    io.sockets.emit("beginPath", data);
  });

  socket.on("drawStroke", (data) => {
    io.sockets.emit("drawStroke", data);
  });
  socket.on("redoUndo", (data) => {
    io.sockets.emit("redoUndo", data);
  });
});
