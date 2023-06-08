const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema(
    {
        messageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "message",
            required: true,
        },
        chatRoomId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "chat-room",
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        fileName: {
            type: String,
            required: true,
        },
        fileType: {
            type: String,
            required: true,
        },
        fileSize: {
            type: Number,
            required: true,
        },
        filePath: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Attachment = mongoose.model("attachment", attachmentSchema);

module.exports = Attachment;
