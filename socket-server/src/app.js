const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const rooms = {};

io.on("connection", socket => {
    let previousId;
    const safeJoin = currentId => {
      socket.leave(previousId);
      socket.join(currentId);
      previousId = currentId;
    };
  
    socket.on("getRoom", roomId => {
      safeJoin(roomId);
      socket.emit("sync", rooms[roomId]);
    });
  
    socket.on("addRoom", room => {
      rooms[room.id] = room;
      safeJoin(room.id);
      io.emit("rooms", Object.keys(rooms));
      socket.emit("room", room);
    });
  
    socket.on("editRoom", room => {
      rooms[room.id] = room;
      socket.to(room.id).emit("room", room);
    });

    socket.on("registerPlayer", data => {
      let room = rooms[data.roomId];
      room.players.push(data.player);
      io.emit("room", room);
    });
  
    io.emit("rooms", Object.keys(rooms));
  });

  http.listen(7400);