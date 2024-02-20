const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
require("dotenv").config();
const app = express();

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Yanji Social Swagger",
      version: "1.0.0",
    },
    servers: [
      {
        url: `/api/v1/`,
      },
    ],
  },
  apis: ["./src/app/swagger/*.yaml"],
};
const swaggerSpec = swaggerJSDoc(swaggerOptions);

const ApiError = require("./api.error");

const blockListRoute = require("./src/app/routes/block-list.routes");
const commentRoute = require("./src/app/routes/comment.routes");
const contactRoute = require("./src/app/routes/contact.routes");
const msgRoute = require("./src/app/routes/message.routes");
const notificationRoute = require("./src/app/routes/notification.routes");
const postRoute = require("./src/app/routes/post.routes");
const roomRoute = require("./src/app/routes/room.routes");
const userRoute = require("./src/app/routes/user.routes");
const imgRoute = require("./src/app/routes/image.routes");
const audioRoute = require("./src/app/routes/audio.routes");

//add
const adminRoute = require("./src/app/routes/admin.routes");
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
app.use("/api/v1/block-list", blockListRoute);
app.use("/api/v1/comment", commentRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/message", msgRoute);
app.use("/api/v1/notification", notificationRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/room", roomRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/image", imgRoute);
app.use("/api/v1/audio", audioRoute);
app.use("/api/v1/swagger", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

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
