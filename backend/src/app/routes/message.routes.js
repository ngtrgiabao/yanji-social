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
  MessageController.getAllMessages,
);
router.get("/all-messages/room/:roomID", MessageController.getAllMessages);
router.get(
  "/get-message/:msgID",
  MessageMiddleware.validateMsgID,
  MessageController.getMessageByID,
);

router.post(
  "/send-message/:userID",
  UserMiddleware.validateUserById,
  MessageController.sendMessage,
);

router.put(
  "/update-message/:msgID",
  MessageMiddleware.validateMsgID,
  MessageController.updateMessage,
);

router.delete(
  "/delete-message/:msgID",
  MessageMiddleware.validateMsgID,
  MessageController.deleteMessage,
);
router.delete(
  "/delete-all/user/:userID",
  UserMiddleware.validateUserById,
  MessageController.deleteAllMessages,
);
router.delete("/delete-all", MessageController.deleteAllMessages);

module.exports = router;
