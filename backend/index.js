const config = require("./src/app/config/port.config");
const MongoDB = require("./src/app/utils/mongodb.utils");
const socket = require("./socket");

require("dotenv").config();

const startServer = async () => {
    try {
        await MongoDB.connect(process.env.MONGODB_URI);
        console.log("Connected to db :D");

        const SOCKET_PORT = process.env.SOCKET_PORT;

        socket.listen(SOCKET_PORT, () => {
            console.log("Socket connected successfully");
        });
    } catch (error) {
        console.log("Cannot connect to db :<", error);
        process.exit();
    }
};

startServer();
