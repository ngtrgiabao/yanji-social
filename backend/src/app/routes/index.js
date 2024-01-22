const express = require("express");
const router = express.Router();
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerConfig = require("../config/swagger.config");
const swaggerSpec = swaggerJSDoc(swaggerConfig);

const { PRIMARY_ROUTE } = require("../constants/global");

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
const otpRoute = require("./otp.routes");

router.use(PRIMARY_ROUTE + "block-list", blockListRoute);
router.use(PRIMARY_ROUTE + "comment", commentRoute);
router.use(PRIMARY_ROUTE + "contact", contactRoute);
router.use(PRIMARY_ROUTE + "message", msgRoute);
router.use(PRIMARY_ROUTE + "notification", notificationRoute);
router.use(PRIMARY_ROUTE + "post", postRoute);
router.use(PRIMARY_ROUTE + "room", roomRoute);
router.use(PRIMARY_ROUTE + "user", userRoute);
router.use(PRIMARY_ROUTE + "image", imgRoute);
router.use(PRIMARY_ROUTE + "audio", audioRoute);
router.use(PRIMARY_ROUTE + "otp", otpRoute);
router.use(PRIMARY_ROUTE + "swagger", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

module.exports = router;
