const io = require("socket.io")();
const socketServer = { io };

const userIdHash = {};
const socketIdHash = {};

socketServer.io.on("connect", (socket) => {
  const { userId } = socket.handshake.query;
  console.log(`User ${userId} connected`);

  if (userIdHash[userId]) {
    userIdHash[userId].push(socket.id);
  } else {
    userIdHash[userId] = [socket.id];
  }

  socket.userId = userId;
  socket.on("disconnect", () => {
    userIdHash[userId].forEach((socketId, i) => {
      if (socketId === socket.id) userIdHash[userId].splice(i, 1);
    });
    delete socketIdHash[socket.id];

    console.log(`User ${userId} disconnected`);
  });
});

socketServer.newMessage = (userId, customerId, message) => {
  // If user is connected on more than one device, emit new_message to all
  const socketIds = userIdHash[userId];
  socketIds.forEach((socketId) => {
    socketServer.io.sockets.connected[socketId].emit("new_message", {
      customerId,
      message,
    });
  });
};

module.exports = socketServer;
