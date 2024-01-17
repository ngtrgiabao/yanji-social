const express = require("express");
const router = express.Router();
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerConfig = require("../config/swagger.config");
const swaggerSpec = swaggerJSDoc(swaggerConfig);

const blockListRoute = require("./block-list.routes");
const commentRoute = require("./comment.routes");
const contactRoute = require("./contact.routes");
const msgRoute = require("./message.routes");
const notificationRoute = require("./notification.routes");
const postRoute = require("./post.routes");
const roomRoute = require("./room.routes");
const userRoute = require("./user.routes");
const imgRoute = require("./image.routes");
const audioRoute = require("./audio.routes");

router.use("/api/v1/block-list", blockListRoute);
router.use("/api/v1/comment", commentRoute);
router.use("/api/v1/contact", contactRoute);
router.use("/api/v1/message", msgRoute);
router.use("/api/v1/notification", notificationRoute);
router.use("/api/v1/post", postRoute);
router.use("/api/v1/room", roomRoute);
router.use("/api/v1/user", userRoute);
router.use("/api/v1/image", imgRoute);
router.use("/api/v1/audio", audioRoute);
router.use("/api/v1/swagger", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

module.exports = router;