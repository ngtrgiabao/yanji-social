const app = require("./app");

const http = require("http");
const { Server } = require("socket.io");
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
    },
});

io.on("connection", (socket) => {
    try {
        console.log(`User connected: ${socket.id} successfully :D`);
        socket.on("send-msg", (data) => {
            console.log(data);
        });

        socket.emit("server", {
            msg: "Hello from server 😎",
        });

        socket.on("chat-message", (data) => {
            const { message, userID } = data;
            io.emit("chat-message", { message, userID });
        });

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    } catch (error) {
        console.error("User cannot connected");
    }
});

module.exports = httpServer;
