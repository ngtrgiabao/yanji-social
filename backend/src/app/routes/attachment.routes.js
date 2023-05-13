const express = require("express");
const router = express.Router();

const AttachmentMiddleware = require("../middleware/attachment.middleware");
const RoomMiddleware = require("../middleware/room.middleware");
const UserMiddleware = require("../middleware/user.middleware");
const MessageMiddleware = require("../middleware/message.middleware");
const AttachmentController = require("../controllers/attachment.controller.js");

router.get("/", (req, res) => {
    res.send({
        msg: "Hello from attachment :D",
    });
});
router.get(
    "/:attachmentID/user/:userID",
    UserMiddleware.validateUserById,
    AttachmentMiddleware.validateAttachmentID,
    AttachmentController.getAllAttachmentsByUserId
);
router.get(
    "/:attachmentID/message/:msgID",
    MessageMiddleware.validateMsgID,
    AttachmentMiddleware.validateAttachmentID,
    AttachmentController.getAttachmentsByMsg
);
router.get(
    "/:attachmentID/room/:roomID",
    RoomMiddleware.validateRoomID,
    AttachmentMiddleware.validateAttachmentID,
    AttachmentController.getAttachmentsByChatRoom
);
router.get("/all-attachments", AttachmentController.getAllAttachments);
router.get(
    "/:attachmentID",
    AttachmentMiddleware.validateAttachmentID,
    AttachmentController.getAttachmentById
);

router.post(
    "/upload",
    AttachmentMiddleware.validateUploadAttachment,
    AttachmentController.uploadAttachment
);
router.post(
    "/download/:attachmentID",
    AttachmentMiddleware.validateAttachmentID,
    AttachmentController.downloadAttachment
);

router.put(
    "/update/:attachmentID",
    AttachmentMiddleware.validateAttachmentID,
    AttachmentController.updateAttachment
);

router.delete("/delete-all", AttachmentController.deleteAllAttachments);
router.delete(
    "/delete/:attachmentID",
    AttachmentMiddleware.validateAttachmentID,
    AttachmentController.deleteAttachment
);
router.delete(
    "/delete/room/:roomID",
    RoomMiddleware.validateRoomID,
    AttachmentController.deleteAttachmentByChatRoom
);
router.delete(
    "/delete/message/:msgID",
    MessageMiddleware.validateMsgID,
    AttachmentController.deleteAttachmentByMsg
);
router.delete(
    "/delete/user/:userID",
    UserMiddleware.validateUserById,
    AttachmentController.deleteAttachmentByUser
);

module.exports = router;
