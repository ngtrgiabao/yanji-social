const express = require("express");
const router = express.Router();

const MessageController = require("../controllers/message.controller");
const MessageMiddleware = require("../middleware/message.middleware");
const UserMiddleware = require("../middleware/user.middleware");

router.get("/", (req, res) => {
    res.send({
        msg: "Hello from message :D",
    });
});
router.get(
    "/all-messages/user/:userID",
    UserMiddleware.validateUserById,
    MessageController.getAllMessages
);

router.post(
    "/send-message/:userID",
    MessageMiddleware.validateSenderAndReceiver,
    UserMiddleware.validateUserById,
    MessageController.sendMessage
);

router.delete(
    "/delete-message/:msgID",
    MessageMiddleware.validateMsgID,
    MessageController.deleteMessage
);
router.delete(
    "/delete-all/user/:userID",
    UserMiddleware.validateUserById,
    MessageController.deleteAllMessages
);

module.exports = router;
