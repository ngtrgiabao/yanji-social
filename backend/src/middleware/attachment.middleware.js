const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");

const Attachment = require("../models/attachment.model");
const User = require("../models/user.model");
const Message = require("../models/message.model");
const Room = require("../models/room.model");

const validateObjectId = (id, fieldName, res) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        console.error(`${fieldName} must be a valid ObjectId`);
        return res
            .status(400)
            .json({ msg: `${fieldName} must be a valid ObjectId` });
    }
};

const validateAttachmentID = async (req, res, next) => {
    try {
        const attachmentID = req.params.attachmentID;
        const attachment = await Attachment.findById(ObjectId(attachmentID));

        if (!attachment) {
            console.error("Attachment not found");
            return res.status(404).json({
                msg: "Attachment not found!",
            });
        }

        next();
    } catch (error) {
        console.error("Failed to validate attachment ID", error);
        return res.status(500).json({
            msg: "Failed to validate attachment ID",
        });
    }
};

const validateUploadAttachment = async (req, res, next) => {
    try {
        const { userId, messageId, chatRoomId } = req.body;
        const validRoom = await Room.findById(chatRoomId);
        const validUser = await User.findById(userId);
        const validMsg = await Message.findById(messageId);

        const requiredFields = [
            "userId",
            "messageId",
            "fileName",
            "filePath",
            "fileType",
            "fileSize",
        ];
        const emptyFields = requiredFields.filter((field) => !req.body[field]);

        if (emptyFields.length > 0) {
            const errorMessages = emptyFields.reduce((errors, field) => {
                errors[field] = "can't be empty";
                return errors;
            }, {});

            console.error(errorMessages);
            return res.status(401).json(errorMessages);
        }

        validateObjectId(userId, "User ID", res);
        validateObjectId(messageId, "Message ID", res);
        validateObjectId(chatRoomId, "Chat Room ID", res);

        if (!validUser) {
            console.error("User not found!");
            return res.status(404).json({ msg: "User not found" });
        }

        if (!validMsg) {
            console.error("Message not found!");
            return res.status(404).json({ msg: "Message not found" });
        }

        if (!validRoom) {
            console.error("Room not found!");
            return res.status(404).json({ msg: "Room not found" });
        }

        next();
    } catch (error) {
        console.error("Failed to validate upload attachment", error);
        return res
            .status(500)
            .json({ msg: "Failed to validate upload attachment" });
    }
};

module.exports = {
    validateAttachmentID,
    validateUploadAttachment,
};
