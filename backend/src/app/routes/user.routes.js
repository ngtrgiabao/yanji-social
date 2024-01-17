const express = require("express");
const router = express.Router();

const { userMiddleware } = require("../middleware/user.middleware");

const { userController } = require("../controllers/user.controller");
const { imageController } = require("../controllers/image.controller");
const { audioController } = require("../controllers/audio.controller");

router.get("/", (req, res) => {
  res.send({ msg: "Hello from user :D" });
});
router.get("/username/:username", userController.getByUsername);
router.get("/all-users", userController.getAllUsersByUsername);
router.get("/:userID", userMiddleware.validateUserById, userController.getUser);
router.get(
  "/:userID/shared",
  userMiddleware.validateUserById,
  userController.getPostsShared,
);
router.get(
  "/:userID/saved",
  userMiddleware.validateUserById,
  userController.getPostsSaved,
);
router.get(
  "/:userID/quantity/image",
  userMiddleware.validateUserById,
  imageController.fetchUserSpecificImageQuantity,
);
router.get(
  "/:userID/quantity/audio",
  userMiddleware.validateUserById,
  audioController.fetchUserSpecificAudioQuantity,
);

router.post(
  "/register",
  userMiddleware.validateRegisterUser,
  userController.register,
);
router.post("/login", userMiddleware.validateLoginUser, userController.login);

router.put(
  "/update/:userID",
  userMiddleware.validateUserById,
  userController.updateUser,
);
router.put(
  "/:userID/follow",
  userMiddleware.validateUserById,
  userController.followUser,
);

router.delete("/delete-all", userController.deleteAllUsers);
router.delete(
  "/delete/:userID",
  userMiddleware.validateUserById,
  userController.deleteUser,
);

module.exports = router;
