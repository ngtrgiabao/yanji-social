const express = require("express");
const router = express.Router();

const UserMiddleware = require("../middleware/user.middleware");

const UserController = require("../controllers/user.controller");
const ImageController = require("../controllers/image.controller");
const AudioController = require("../controllers/audio.controller");

router.get("/", (req, res) => {
  res.send({ msg: "Hello from user :D" });
});
router.get("/all-users", UserController.getAllUsers);
router.get("/:userID", UserMiddleware.validateUserById, UserController.getUser);
router.get(
  "/:userID/shared",
  UserMiddleware.validateUserById,
  UserController.getPostsShared,
);
router.get(
  "/:userID/saved",
  UserMiddleware.validateUserById,
  UserController.getPostsSaved,
);
router.get(
  "/:userID/quantity/image",
  UserMiddleware.validateUserById,
  ImageController.fetchUserSpecificImageQuantity,
);
router.get(
  "/:userID/quantity/audio",
  UserMiddleware.validateUserById,
  AudioController.fetchUserSpecificAudioQuantity,
);

router.post(
  "/register",
  UserMiddleware.validateRegisterUser,
  UserController.register,
);
router.post("/login", UserMiddleware.validateLoginUser, UserController.login);
router.post("/reset-password", UserController.resetPassword);

router.put(
  "/update/:userID",
  UserMiddleware.validateUserById,
  UserController.updateUser,
);
router.put(
  "/:userID/follow",
  UserMiddleware.validateUserById,
  UserController.followUser,
);

router.delete("/delete-all", UserController.deleteAllUsers);
router.delete(
  "/delete/:userID",
  UserMiddleware.validateUserById,
  UserController.deleteUser,
);

module.exports = router;
