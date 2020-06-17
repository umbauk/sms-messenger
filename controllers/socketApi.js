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
  // There may be more than one socket with same userId if user is logged in on
  // multiple devices, so find all sockets
  const sockets = socketApi.sockets.filter((curr) => curr.userId == userId);
  console.log("socketApi.sockets.length", socketApi.sockets.length);
  console.log("No. sockets found:", sockets.length);
  socketApi.sockets.forEach((socket) => {
    console.log("socket.userId:", socket.userId);
  });
  sockets.forEach((socket) =>
    socket.emit("new_message", { customerId, message })
  );
};

module.exports = socketApi;
