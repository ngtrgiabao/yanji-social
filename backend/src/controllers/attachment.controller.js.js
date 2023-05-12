const AttachmentModel = require("../models/attachment.model");

const uploadAttachment = async (req, res, next) => {
    try {
        const {
            messageId,
            userId,
            chatRoomId,
            fileName,
            fileType,
            fileSize,
            filePath,
        } = req.body;

        const attachment = await AttachmentModel.create({
            messageId,
            userId,
            chatRoomId,
            fileName,
            fileType,
            fileSize,
            filePath,
        });

        return res.status(200).json({
            msg: "Attachment uploaded successfully",
            attachment,
        });
    } catch (error) {
        console.error("Failed to upload attachment", error);
        return res.status(500).json({
            msg: "Failed to upload attachment",
        });
    }
};

const updateAttachment = async (req, res, next) => {
    const attachmentID = req.params.attachmentID;
    try {
        const attachment = await AttachmentModel.findById(attachmentID);
        const { fileName, filePath, fileType, fileSize, messageId } = req.body;

        attachment.fileName = fileName || attachment.fileName;
        attachment.filePath = filePath || attachment.filePath;
        attachment.fileType = fileType || attachment.fileType;
        attachment.fileSize = fileSize || attachment.fileSize;
        attachment.messageId = messageId || attachment.messageId;

        const updatedAttachment = await attachment.save();

        return res.status(200).json({
            msg: `Attachment ${attachmentID} updated successfully`,
            data: updatedAttachment,
        });
    } catch (error) {
        console.error(`Failed to update attachment ${attachmentID}`, error);
        return res.status(500).json({
            msg: `Failed to update attachment ${attachmentID}`,
        });
    }
};

const getAttachmentById = async (req, res, next) => {
    const attachmentID = req.params.attachmentID;
    try {
        const attachment = AttachmentModel.findById(attachmentID);

        return res.status(200).json({
            msg: `Get attachment ${attachmentID} successfully`,
            attachment,
        });
    } catch (error) {
        console.error(`Failed to get attachment ${attachmentID}`, error);
        res.status(500).json({
            msg: `Failed to get attachment ${attachmentID}`,
        });
    }
};

const getAllAttachments = async (req, res, next) => {
    try {
        const attachments = await AttachmentModel.find({});

        return res.status(200).json({
            msg: "Get all attachments successfully",
            attachments,
        });
    } catch (error) {
        console.error("Failed to get all attachments");
        return res.status(500).json({
            msg: "Failed to get all attachments",
        });
    }
};

const deleteAttachment = async (req, res, next) => {
    try {
        const attachmentID = req.params.attachmentID;
        await AttachmentModel.findByIdAndDelete(attachmentID);

        return res.status(200).json({
            msg: "Deleted attachment successfully",
        });
    } catch (error) {
        console.error("Failed to delete attachment", error);
        return res.status(500).json({
            msg: "Failed to delete attachment",
        });
    }
};

const deleteAllAttachments = async (req, res, next) => {
    try {
        await AttachmentModel.deleteMany({});

        return res.status(200).json({
            msg: "Delete all attachments successfully",
        });
    } catch (error) {
        console.error("Failed to deleted all attachments", error);
        return res.status(500).json({
            msg: "Failed to delete all attachments",
        });
    }
};

const deleteAttachmentByMsg = async (req, res, next) => {
    const messageID = req.params.messageID;
    try {
        await AttachmentModel.deleteMany({ messageId: messageID });

        return res.status(200).json({
            msg: `Delete all attachments of message ${messageID} successfully`,
        });
    } catch (error) {
        console.error(
            `Failed to delete all attachments of message ${messageID}`,
            error
        );
        return res.status(500).json({
            msg: `Failed to delete attachments by message ${messageID}`,
        });
    }
};

const deleteAttachmentByChatRoom = async (req, res, next) => {
    const chatRoomID = req.params.roomID;
    try {
        await AttachmentModel.deleteMany({ chatRoomId: chatRoomID });

        return res.status(200).json({
            msg: `Delete all attachments of chat room ${chatRoomID} successfully`,
        });
    } catch (error) {
        console.error(
            `Failed to delete attachments by chat room ${chatRoomID}`,
            error
        );
        return res.status(500).json({
            msg: `Failed to delete attachments by chat room ${chatRoomID}`,
        });
    }
};

const deleteAttachmentByUser = async (req, res, next) => {
    const userID = req.params.userID;
    try {
        await AttachmentModel.deleteMany({ userId: userID });

        return res.status(200).json({
            msg: `Delete all attachments of user ${userID} successfully`,
        });
    } catch (error) {
        consoler.error(
            `Failed to delete all attachments of user ${userID}`,
            error
        );
        return res.status(500).json({
            msg: `Failed to delete all attachments of user${userID}`,
        });
    }
};

const getAttachmentsByMsg = async (req, res, next) => {
    const msgID = req.params.msgID;
    try {
        const attachments = await AttachmentModel.find({ messageId: msgID });

        return res.status(200).json({
            msg: `Get attachments by message ${msgID} successfully`,
            attachments,
        });
    } catch (error) {
        console.error(`Failed to get attachments by message ${msgID}`, error);
        return res.status(500).json({
            msg: `Failed to get attachments by message ${msgID}`,
        });
    }
};

const getAttachmentsByChatRoom = async (req, res, next) => {
    const chatRoomID = req.params.roomID;
    try {
        const attachments = await AttachmentModel.find({
            chatRoomId: chatRoomID,
        });

        return res.status(200).json({
            msg: `Get attachments by chat room ${chatRoomID} successfully`,
            attachments,
        });
    } catch (error) {
        console.error(
            `Failed to get attachments by chat room ${chatRoomID}`,
            error
        );
        return res.status(500).json({
            msg: `Failed to get attachments by chat room ${chatRoomID}`,
        });
    }
};

const getAllAttachmentsByUserId = async (req, res, next) => {
    const userID = req.params.userID;
    try {
        const attachments = await AttachmentModel.find({ userId: userID });

        return res.status(200).json({
            msg: `Get all attachments of user ${userID} successfully`,
            attachments,
        });
    } catch (error) {
        console.error(`Failed to get all attachments of ${userID}`);
        return res.status(500).json({
            msg: `Failed to get all attachments of ${userID}`,
        });
    }
};

const downloadAttachment = async (req, res, next) => {
    try {
        const attachmentID = req.params.attachmentID;
        const attachment = await AttachmentModel.findById(attachmentID);

        const filePath = attachment.filePath;
        res.download(filePath, attachment.fileName);

        return res.status(200).json({
            msg: "Download attachment successfully",
        });
    } catch (error) {
        console.error("Failed to download attachment", error);
        return res.status(500).json({
            msg: "Failed to download attachment",
        });
    }
};

module.exports = {
    uploadAttachment,
    updateAttachment,
    getAttachmentById,
    getAllAttachments,
    deleteAttachment,
    deleteAllAttachments,
    deleteAttachmentByMsg,
    deleteAttachmentByChatRoom,
    deleteAttachmentByUser,
    getAttachmentsByMsg,
    getAttachmentsByChatRoom,
    getAllAttachmentsByUserId,
    downloadAttachment,
};
