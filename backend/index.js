const app = require("./app");
const config = require("./src/app/config/port.config");
const MongoDB = require("./src/app/utils/mongodb.utils");
const socket = require("./socket");

const startServer = async () => {
    try {
        await MongoDB.connect(config.db.uri);
        console.log("Connected to db :D");

        const PORT = config.app.port;
        const SOCKET_PORT = config.socket.port;

        app.listen(PORT, () => {
            console.log(`Server run success at localhost:${PORT} :D`);
        });

        socket.listen(SOCKET_PORT, () => {
            console.log("Socket connected successfully");
        });
    } catch (error) {
        console.log("Cannot connect to db :<");
        process.exit();
    }
};

startServer();
