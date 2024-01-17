const express = require("express");
const router = express.Router();

const {
  notificationController,
} = require("../controllers/notification.controller.js");
const NotiMiddleware = require("../middleware/notification.middleware.js");
const { userMiddleware } = require("../middleware/user.middleware.js");

router.get(
  "/all/user/:userID",
  userMiddleware.validateUserById,
  notificationController.getAllNotisByUser,
);
router.get(
  "/:notiID",
  NotiMiddleware.validateNotiID,
  notificationController.getNotiByID,
);

router.post("/new", notificationController.createNewNoti);

router.put(
  "/mark-seen/:notiID",
  NotiMiddleware.validateNotiID,
  notificationController.markSeen,
);

router.delete(
  "/delete/:notiID",
  NotiMiddleware.validateNotiID,
  notificationController.deleteNoti,
);

module.exports = router;
