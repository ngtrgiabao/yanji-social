const NotificationModel = require("../models/notification.model");

const createNewNoti = async (req, res) => {
    try {
        const { sender, receiver, type } = req.body;
        const newNoti = await NotificationModel.create({
            sender,
            receiver,
            type,
        });

        return res.status(200).json({
            msg: `New noti created successfully`,
            data: newNoti,
        });
    } catch (error) {
        console.error("Failed to create new noti", error);
        return res.status(500).json({
            msg: "Failed to create new noti",
            error,
        });
    }
};

const getAllNotisByUser = async (req, res) => {
    const userID = req.params.userID;

    try {
        const notiList = await NotificationModel.find({ receiver: userID });

        return res.status(200).json({
            msg: `Get all notis of user ${userID} successfully`,
            data: notiList,
        });
    } catch (error) {
        console.error(`Failed to get all notis of user ${userID}`, error);
        return res.status(500).json({
            msg: `Failed to get all notis of user ${userID}`,
            error,
        });
    }
};

const getNotiByID = async (req, res) => {
    const notiID = req.params.notiID;

    try {
        const notiList = await NotificationModel.findById(notiID);

        return res.status(200).json({
            msg: `Get noti successfully`,
            data: notiList,
        });
    } catch (error) {
        console.error(`Failed to get noti`, error);
        return res.status(500).json({
            msg: `Failed to get noti`,
            error,
        });
    }
};

const markSeen = async (req, res) => {
    const notiID = req.params.notiID;

    try {
        const { isRead } = req.body;
        const noti = await NotificationModel.findById(notiID);

        noti.isRead = isRead || noti.isRead;

        const updatedNoti = await noti.save();

        return res.status(200).json({
            msg: `Mark seen noti successfully`,
            data: updatedNoti,
        });
    } catch (error) {
        console.error("Failed to mark seen noti", error);
        return res.status(500).json({
            msg: "Failed to mark seen noti",
            error,
        });
    }
};

const deleteNoti = async (req, res) => {
    const notiID = req.params.notiID;

    try {
        await NotificationModel.findByIdAndDelete(notiID);

        return res.status(200).json({
            msg: `Noti deleted successfully`,
        });
    } catch (error) {
        console.error("Failed to delete noti", error);
        return res.status(500).json({
            msg: `Failed to delete noti`,
        });
    }
};

module.exports = {
    createNewNoti,
    getAllNotisByUser,
    getNotiByID,
    markSeen,
    deleteNoti,
};
