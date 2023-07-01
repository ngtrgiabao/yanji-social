const config = require("./src/app/config/port.config");
const MongoDB = require("./src/app/utils/mongodb.utils");
const socket = require("./socket");

const startServer = async () => {
    try {
        await MongoDB.connect(config.db.uri);
        console.log("Connected to db :D");

        const SOCKET_PORT = config.socket.port;

        socket.listen(SOCKET_PORT, () => {
            console.log("Socket connected successfully");
        });
    } catch (error) {
        console.log("Cannot connect to db :<", error);
        process.exit();
    }
};

startServer();
