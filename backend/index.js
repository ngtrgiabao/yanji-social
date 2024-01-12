require("dotenv").config();

const MongoDB = require("./src/app/utils/mongodb.utils");
const socket = require("./socket");

const startServer = async () => {
  try {
    await MongoDB.connect(process.env.MONGODB_URI);
    console.log("Connected to db :D");

    const SOCKET_PORT = process.env.SOCKET_PORT;

    socket.listen(SOCKET_PORT, () => {
      console.log("Socket connected successfully on port", SOCKET_PORT);
      console.log(
        "Swagger is running on",
        `http://localhost:${SOCKET_PORT}/api/v1/swagger`,
      );
    });
  } catch (error) {
    console.error("Cannot connect to db :<", error);
    process.exit(1);
  }
};

startServer();
