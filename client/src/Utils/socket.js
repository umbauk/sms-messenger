import io from "socket.io-client";

const connect = (userId) => {
  const url = process.env.REACT_APP_SERVER_URL || "http://localhost:3001";
  const socket = io(url, { query: { userId } });
  return socket;
};

export default connect;
