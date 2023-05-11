const express = require("express");
const router = express.Router();

const messageController = require("../controllers/message.controller");
const messageMiddleware = require("../middleware/message.middleware");
const UserMiddleware = require("../middleware/user.middleware");

router.get("/", (req, res) => {
    res.send({
        msg: "Hello from message :D",
    });
});
router.get(
    "/:userID/messages",
    UserMiddleware.getUserById,
    messageController.getAllMessages
);

router.post(
    "/:userID/send-message",
    messageMiddleware.validateSenderAndReceiver,
    UserMiddleware.getUserById,
    messageController.sendMessage
);

router.delete(
    "/:msgID/delete-message",
    messageMiddleware.validateMsgID,
    messageController.deleteMessage
);
router.delete(
    "/:userID/messages",
    UserMiddleware.getUserById,
    messageController.deleteAllMessages
);

module.exports = router;
