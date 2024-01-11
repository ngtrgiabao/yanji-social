const express = require("express");
const router = express.Router();

const { messageController } = require("../controllers/message.controller");
const MessageMiddleware = require("../middleware/message.middleware");
const { userMiddleware } = require("../middleware/user.middleware");

router.get("/", (req, res) => {
  res.send({
    msg: "Hello from message :D",
  });
});
router.get(
  "/all-messages/user/:userID",
  userMiddleware.validateUserById,
  messageController.getAllMessages,
);
router.get("/all-messages/room/:roomID", messageController.getAllMessages);
router.get(
  "/get-message/:msgID",
  MessageMiddleware.validateMsgID,
  messageController.getMessageByID,
);

router.post("/send-message", messageController.sendMessage);

router.put(
  "/update-message/:msgID",
  MessageMiddleware.validateMsgID,
  messageController.updateMessage,
);

router.delete(
  "/delete-message/:msgID",
  MessageMiddleware.validateMsgID,
  messageController.deleteMessage,
);
router.delete(
  "/delete-all/user/:userID",
  userMiddleware.validateUserById,
  messageController.deleteAllMessages,
);
router.delete("/delete-all", messageController.deleteAllMessages);

module.exports = router;
