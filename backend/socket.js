const app = require("./app");
const { Server } = require("socket.io");
const httpServer = require("http").createServer(app);
require("dotenv").config();

const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
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

    socket.on("follow", (data) => {
      io.emit("followed", data);
    });

    // HANDLE MESSAGE OF USER
    socket.on("send-message", (data) => {
      const { sender, time } = data;
      io.emit("receive-message", { ...data });
      console.log(`User ${sender} have sent message at ${time}`);
    });
    socket.on("update-message", (data) => {
      const { _id } = data;

      io.emit("updated-message", { ...data });
      console.log(`Update message ${_id} successfully`);
    });
    socket.on("delete-message", (msgID) => {
      io.emit("deleted-message", msgID);
      console.log(`Deleted message ${msgID} successfully`);
    });

    // HANDLE USER ONLINE
    socket.on("add-user", (data) => {
      const { user } = data;
      addUser(user, socket.id);

      console.log(users);
      io.emit("get-users", users);
    });
    socket.on("delete-post", (data) => {
      const { _id } = data;
      io.emit("deleted-post", data);
      console.log(`Post deleted ${_id} successfully`);
    });

    // HANDLE USER
    socket.on("update-user", (data) => {
      const { userID } = data;
      io.emit("updated-user", data);

      console.log(`Updated user ${userID} successfully`);
    });

    // HANDLE POST
    socket.on("upload-post", (data) => {
      const { _id } = data;
      io.emit("uploaded-post", data);

      console.log(`Uploaded post ${_id} successfully`);
    });
    socket.on("update-post", (data) => {
      if (data) {
        const { _id } = data;
        io.emit("updated-post", data);
        console.log(`Updated post ${_id} successfully`);
      }
    });
    socket.on("comment-post", (data) => {
      const { postID, comments } = data;
      io.emit("commented-post", comments);
      console.log(`Commented post ${postID} successfully`);
    });

    // HANDLE NOTIFICATION
    socket.on("push-notification", (data) => {
      const { type } = data;

      io.emit("pushed-notification", {
        ...data,
        type: parseInt(type, 10),
      });
    });

    socket.on("delete-saved", (data) => {
      io.emit("deleted-saved", data);
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
