const app = require("./app");

const http = require("http");
const { Server } = require("socket.io");
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        // origin: "https://yanji-social.netlify.app/",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});

let users = [];

const addUser = (userID, socketID) => {
    !users.some((user) => user.userID === userID) &&
        users.push({
            userID,
            socketID,
        });
};

const removeUser = (socketID) => {
    users = users.filter((user) => user.socketID !== socketID);
};

io.on("connection", (socket) => {
    try {
        console.log(`User connected: ${socket.id} successfully :D`);
        socket.on("client", (data) => {
            console.log(data);
        });

        socket.emit("server", {
            msg: "Hello from server 😎",
        });

        socket.on("send-message", (data) => {
            const { sender, time } = data;
            io.emit("receive-message", data);
            console.log(`User ${sender} have sent message at ${time}`);
        });

        socket.on("add-user", (data) => {
            const { user } = data;
            addUser(user, socket.id);

            console.log(users);
            io.emit("get-users", users);
        });

        socket.on("disconnect", () => {
            removeUser(socket.id);
            io.emit("get-users", users);

            console.log(users);
            console.log(`User ${socket.id} disconnected`);
        });
    } catch (error) {
        console.error("User cannot connected");
    }
});

module.exports = httpServer;
