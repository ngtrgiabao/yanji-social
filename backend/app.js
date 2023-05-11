const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();

const ApiError = require("./api.error");

const userRoute = require("./src/routes/user.routes");
const msgRoute = require("./src/routes/message.routes");
const roomRoute = require("./src/routes/room.routes");

const corsOptions = {
    origin: "http://localhost:3000",
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
