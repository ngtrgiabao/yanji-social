const NotificationModel = require("../models/notification.model");

class NotificationController {
  createNewNoti = async (req, res) => {
    try {
      const { sender, receiver, type } = req.body;
      const newNoti = await NotificationModel.create({
        sender,
        receiver,
        type,
      });

      return res.status(200).json({
        msg: `New notification created successfully`,
        data: newNoti,
      });
    } catch (error) {
      console.error("Failed to create new notification", error);
      return res.status(500).json({
        msg: "Failed to create new notification",
        error,
      });
    }
  };

  getAllNotisByUser = async (req, res) => {
    const userID = req.params.userID;
    const { limit, skip } = req.query;

    try {
      const notiList =
        limit || skip
          ? await NotificationModel.find({ receiver: userID })
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(skip)
          : await NotificationModel.find({ receiver: userID }).sort({
            createdAt: -1,
          });

      return res.status(200).json({
        msg: `Get all notis of user ${userID} successfully`,
        data: notiList,
      });
    } catch (error) {
      console.error(`Failed to get all notifications of user ${userID}`, error);
      return res.status(500).json({
        msg: `Failed to get all notifications of user ${userID}`,
        error,
      });
    }
  };

  getNotiByID = async (req, res) => {
    const notiID = req.params.notiID;

    try {
      const notiList = await NotificationModel.findById(notiID);

      return res.status(200).json({
        msg: `Get noti successfully`,
        data: notiList,
      });
    } catch (error) {
      console.error(`Failed to get notification`, error);
      return res.status(500).json({
        msg: `Failed to get notification`,
        error,
      });
    }
  };

  markSeen = async (req, res) => {
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
      console.error("Failed to mark seen notification", error);
      return res.status(500).json({
        msg: "Failed to mark seen notification",
        error,
      });
    }
  };

  deleteNoti = async (req, res) => {
    const notiID = req.params.notiID;

    try {
      await NotificationModel.findByIdAndDelete(notiID);

      return res.status(200).json({
        msg: `Noti deleted successfully`,
      });
    } catch (error) {
      console.error("Failed to delete notification", error);
      return res.status(500).json({
        msg: `Failed to delete notification`,
      });
    }
  };
}

const notificationController = new NotificationController();

module.exports = {
  notificationController,
};
