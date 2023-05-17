const MessageModel = require("../models/message.model");
const UserModel = require("../models/user.model");

// Add edit message

const sendMessage = async (req, res) => {
    try {
        const { message, roomId, media, file, sender } = req.body;
        const newMessage = await MessageModel.create({
            roomId,
            message,
            media,
            file,
            sender,
        });

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

const deleteMessage = async (req, res) => {
    const msgID = req.params.msgID;

    await MessageModel.findByIdAndDelete(msgID);

    return res.status(200).json({
        msg: `Message deleted successfully`,
    });
};

const getAllMessages = async (req, res, next) => {
    try {
        const roomId = req.params.roomID;
        const messages = await MessageModel.find({
            roomId,
        });
        return res.status(200).json({
            msg: "Get all messages successfully",
            messages,
        });
    } catch (error) {
        const userID = UserModel.findById(req.params.userID);

        console.error(`Error retrieving messages of user ${userID}: ${error}`);
        return res.status(500).json({
            msg: `Error retrieving messages of user ${userID}: ${error}`,
        });
    }
};

const deleteAllMessages = async (req, res, next) => {
    try {
        const userID = req.params.userID;
        const result = await MessageModel.deleteMany({});

        return res.status(200).json({
            msg: `Delete all messages of user: ${userID} success`,
            count: result.deletedCount,
        });
    } catch (error) {
        const userID = req.params.id;

        console.error(
            `An error occurred while deleting all messages of user: ${userID}`,
            error
        );
        return res.status(500).json({
            msg: `An error occurred while deleting all messages of user: ${userID}`,
        });
    }
};

module.exports = {
    sendMessage,
    deleteMessage,
    getAllMessages,
    deleteAllMessages,
};
