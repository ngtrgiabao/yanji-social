const { ObjectId } = require("mongodb");
const express = require("express");
const router = express.Router();

const MessageModel = require("../models/message.model");
const UserModel = require("../models/user.model");

router.get("/", (req, res) => {
    res.send({
        msg: "Hello from message :D",
    });
});

// SEND MSG
router.post("/profile/:userID/send-message", async (req, res, next) => {
    try {
        const userID = await UserModel.findById(req.params.userID);
        const textField = await MessageModel.find({
            userIDs: req.params.userID,
        });

        if (textField.length > 0 && textField[0].userIDs) {
            // userID exists, push new message to textField[0].text
            textField[0].text.push(req.body.text);
            await textField[0].save();

            return res.status(200).json({
                msg: `User: ${userID.id} send message success`,
                data: textField[0],
            });
        }

        const { text, media, file } = req.body;

        if (!userID) {
            return next("User not found!");
        }

        const newMessage = await MessageModel.create({
            text: [text], // Create a new array with the first message
            media: media,
            file: file,
            userIDs: req.params.userID,
        });

        return res.status(200).json({
            msg: `User: ${userID.id} send message success`,
            data: newMessage,
        });
    } catch (error) {
        return next("Failed to send messages", error);
    }
});

// DELETE A MSG
router.delete("/profile/:msgID/delete-message", async (req, res, next) => {
    try {
        const msgID = req.params.msgID;
        const result = await MessageModel.findByIdAndDelete(msgID);

        if (!result) {
            return res.status(404).json({
                msg: "Message not found",
            });
        }
        return res.status(200).json({
            msg: "Message deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            msg: `An error occurred while deleting the message: ${error}`,
        });
    }
});

// GET ALL MSG
router.get("/profile/:id/messages", async (req, res, next) => {
    try {
        const users = await MessageModel.find({});
        return res.status(200).json(users);
    } catch (err) {
        const userID = UserModel.findById(req.params.id);
        return next(`Error retrieving messages of user ${userID}: ${err}`);
    }
});

// DELETE ALL MSG
router.delete("/:userID/messages", async (req, res, next) => {
    try {
        const userID = req.params.userID;
        const result = await MessageModel.deleteMany({});

        return res.status(200).json({
            msg: `Delete all messages of user: ${userID} success`,
            count: result.deletedCount,
        });
    } catch (err) {
        const userID = req.params.id;
        return next(
            `An error occurred while deleting all messages of user: ${userID}`
        );
    }
});

module.exports = router;
