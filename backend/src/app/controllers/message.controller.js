const MessageModel = require("../models/message.model");
const UserModel = require("../models/user.model");
const { imageController } = require("./image.controller");

class MessageController {
  sendMessage = async (req, res) => {
    try {
      const { message, roomId, media, file, sender } = req.body;
      const newMessage = await MessageModel.create({
        roomId,
        message,
        media,
        file,
        sender,
      });

      if (media) {
        imageController.uploadImageByUserID(sender, media);
      }

      return res.status(200).json({
        msg: `User: ${sender} send message success`,
        data: newMessage,
      });
    } catch (error) {
      console.error("Failed to send message", error);
      return res.status(500).json({
        msg: "Failed to send message",
        error,
      });
    }
  };

  deleteMessage = async (req, res) => {
    const msgID = req.params.msgID;

    const message = await MessageModel.findById(msgID);
    const mediaValue = message.media;
    if (mediaValue) {
      await imageController.deleteImageByID(mediaValue);
    }

    await MessageModel.findByIdAndDelete(msgID);

    return res.status(200).json({
      msg: `Message deleted successfully`,
    });
  };

  getAllMessages = async (req, res, next) => {
    try {
      const roomId = req.params.roomID;
      const messages = await MessageModel.find({
        roomId: roomId,
      });
      return res.status(200).json({
        msg: "Get all messages successfully",
        messages: messages,
      });
    } catch (error) {
      const userID = UserModel.findById(req.params.userID);

      console.error(`Error retrieving messages of user ${userID}: ${error}`);
      return res.status(500).json({
        msg: `Error retrieving messages of user ${userID}: ${error}`,
      });
    }
  };

  deleteAllMessages = async (req, res, next) => {
    const userID = req.params.userID;

    try {
      const result = await MessageModel.deleteMany({ sender: userID });

      return res.status(200).json({
        msg: `Delete all messages of user: ${userID} success`,
        count: result.deletedCount,
      });
    } catch (error) {
      console.error(
        `An error occurred while deleting all messages of user: ${userID}`,
        error,
      );
      return res.status(500).json({
        msg: `An error occurred while deleting all messages of user: ${userID}`,
      });
    }
  };

  getMessageByID = async (req, res, next) => {
    const msgID = req.params.msgID;

    try {
      const result = await MessageModel.findById(msgID);

      return res.status(200).json({
        msg: `Get message ${msgID} successfully`,
        data: result,
      });
    } catch (error) {
      console.error(`Failed to get message ${msgID}`);

      return res.status(500).json({
        msg: `Failed to get message ${msgID}`,
      });
    }
  };

  updateMessage = async (req, res, next) => {
    const msgID = req.params.msgID;

    try {
      const { message, isRead } = req.body;
      const msg = await MessageModel.findById(msgID);

      if (message && message.length > 0) {
        msg.message = message || msg.message;
        msg.isRead = isRead || msg.isRead;

        const updatedMsg = await msg.save();

        return res.status(200).json({
          msg: "Updated message successfully",
          data: updatedMsg,
        });
      }

      return res.status(200).json({
        msg: "Saved message",
      });
    } catch (error) {
      console.error("Failed to update message", error);
      return res.status(500).json({
        msg: "Failed to update message",
      });
    }
  };
}

const messageController = new MessageController();

module.exports = {
  messageController,
};
