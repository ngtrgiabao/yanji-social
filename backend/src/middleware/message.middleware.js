const { ObjectId } = require("mongodb");
const User = require("../models/user.model");
const Message = require("../models/message.model");

const validateSenderAndReceiver = async (req, res, next) => {
    try {
        const { sender, receiver } = req.body;

        const checkValidSender = await User.findById(ObjectId(sender));
        const checkValidReceiver = await User.findById(ObjectId(receiver));

        if (!checkValidReceiver && !checkValidSender) {
            return res.status(400).json({
                msg: "Sender and Receiver not found!",
            });
        }

        if (!checkValidReceiver) {
            return res.status(404).json({
                msg: "Receiver not found!",
            });
        }

        if (!checkValidSender) {
            return res.status(404).json({
                msg: "Sender not found!",
            });
        }

        next();
    } catch (error) {
        console.error("Failed to send messages", error);
        return res.status(500).json({
            msg: `Failed to send messages ${error}`,
        });
    }
};

const validateMsgID = async (req, res, next) => {
    try {
        const msgID = req.params.msgID;
        const result = await Message.findById(msgID);

        if (!result) {
            console.error("Message not found!");
            return res.status(404).json({
                msg: "Message not found",
            });
        }

        next();
    } catch (error) {
        console.error(`An error occurred while deleting the message: ${error}`);
        return res.status(500).json({
            msg: `An error occurred while deleting the message: ${error}`,
        });
    }
};

module.exports = {
    validateSenderAndReceiver,
    validateMsgID,
};
