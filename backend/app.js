const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();

const ApiError = require("./api.error");

const userRoute = require("./src/app/routes/user.routes");
const msgRoute = require("./src/app/routes/message.routes");
const roomRoute = require("./src/app/routes/room.routes");
const attachmentRoute = require("./src/app/routes/attachment.routes");
const notificationRoute = require("./src/app/routes/notification.routes");
const friendRequestRoute = require("./src/app/routes/friend.request.routes");
const contactRoute = require("./src/app/routes/contact.routes");
const blockListRoute = require("./src/app/routes/block.list.routes");
const onlineRoute = require("./src/app/routes/online.routes");
const imageRoute = require("./src/app/routes/image.routes");

const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", msgRoute);
app.use("/api/v1/room", roomRoute);
app.use("/api/v1/attachment", attachmentRoute);
app.use("/api/v1/notification", notificationRoute);
app.use("/api/v1/friend-request", friendRequestRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/block-list", blockListRoute);
app.use("/api/v1/online", onlineRoute);
app.use("/api/v1/image", imageRoute);

//Handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        msg: err.message || "Internal server Error",
    });
});

module.exports = app;
