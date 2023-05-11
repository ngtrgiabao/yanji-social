const MessageModel = require("../models/message.model");
const UserModel = require("../models/user.model");

exports.sendMessage = async (req, res) => {
    const { text, media, file, sender, receiver } = req.body;

    const userID = await UserModel.findById(req.params.userID);
    const textField = await MessageModel.find({
        userIDs: req.params.userID,
    });

    if (textField.length > 0 && textField[0].userIDs) {
        textField[0].text.push(req.body.text);
        await textField[0].save();

        return res.status(200).json({
            msg: `User: ${userID.id} send message success`,
            data: textField[0],
        });
    }

    const newMessage = await MessageModel.create({
        text: [text],
        media,
        file,
        sender,
        receiver,
        userIDs: req.params.userID,
    });

    return res.status(200).json({
        msg: `User: ${userID.id} send message success`,
        data: newMessage,
    });
};

exports.deleteMessage = async (req, res) => {
    const msgID = req.params.msgID;

    await MessageModel.findByIdAndDelete(msgID);

    return res.status(200).json({
        msg: `Message deleted successfully`,
    });
};

exports.getAllMessages = async (req, res, next) => {
    try {
        const users = await MessageModel.find({});
        return res.status(200).json(users);
    } catch (error) {
        const userID = UserModel.findById(req.params.userID);

        console.error(`Error retrieving messages of user ${userID}: ${error}`);
        return res.status(500).json({
            msg: `Error retrieving messages of user ${userID}: ${error}`,
        });
    }
};

exports.deleteAllMessages = async (req, res, next) => {
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
