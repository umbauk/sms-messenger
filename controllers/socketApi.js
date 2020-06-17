const io = require("socket.io")();
const socketApi = { io };

socketApi.sockets = [];

socketApi.io.on("connect", (socket) => {
  const { userId } = socket.handshake.query;
  console.log(`User ${userId} connected`);

  socket.userId = userId;
  socket.on("disconnect", () => {
    socketApi.sockets.splice(socketApi.sockets.indexOf(socket), 1);
    console.log(`User ${socket.userId} disconnected`);
  });

  socketApi.sockets.push(socket);
});

socketApi.newMessage = (userId, customerId, message) => {
  const socket = socketApi.sockets.find((curr) => curr.userId == userId);
  socket.emit("new_message", { customerId, message });
};

module.exports = socketApi;
