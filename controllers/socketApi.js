/*
 * Handles connections/disconnections to socketServer and emits socket messages
 */

const io = require("socket.io")();
const socketServer = { io };
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const secret = require("../config/config").appSecret;

const userIdHash = {};
const socketIdHash = {};

socketServer.io.on("connection", async (socket) => {
  try {
    const token = cookie.parse(socket.handshake.headers.cookie).jwt;
    const payload = await jwt.verify(token, secret);

    const { userId } = socket.handshake.query;
    if (userId === payload.id) {
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
    }
  } catch (error) {
    console.log("Error connecting user to socket server", error);
  }
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
