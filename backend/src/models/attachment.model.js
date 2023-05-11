const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema(
    {
        messageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "messages",
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

const Attachment = mongoose.model("attachments", attachmentSchema);

module.exports = Attachment;
