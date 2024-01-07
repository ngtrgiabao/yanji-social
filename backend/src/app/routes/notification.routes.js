const express = require("express");
const router = express.Router();

const NotiController = require("../controllers/notification.controller.js");
const NotiMiddleware = require("../middleware/notification.middleware.js");
const UserMiddleware = require("../middleware/user.middleware.js");

router.get(
  "/all/user/:userID",
  UserMiddleware.validateUserById,
  NotiController.getAllNotisByUser,
);
router.get(
  "/:notiID",
  NotiMiddleware.validateNotiID,
  NotiController.getNotiByID,
);

router.post("/new", NotiController.createNewNoti);

router.put(
  "/mark-seen/:notiID",
  NotiMiddleware.validateNotiID,
  NotiController.markSeen,
);

router.delete(
  "/delete/:notiID",
  NotiMiddleware.validateNotiID,
  NotiController.deleteNoti,
);

module.exports = router;
