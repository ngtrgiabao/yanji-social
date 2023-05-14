require("dotenv").config();

const config = {
    app: {
        port: process.env.PORT || 3000,
    },
    db: {
        uri: process.env.MONGODB_URI,
    },
    socket: {
        port: process.env.SOCKET_PORT || 9001,
    },
};

module.exports = config;
