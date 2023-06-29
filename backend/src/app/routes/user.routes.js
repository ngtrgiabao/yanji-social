const express = require("express");
const router = express.Router();

const UserMiddleware = require("../middleware/user.middleware");
const UserController = require("../controllers/user.controller");

router.get("/", (req, res) => {
    res.send({ msg: "Hello from user :D" });
});
router.get("/all-users", UserController.getAllUsers);
router.get("/:userID", UserMiddleware.validateUserById, UserController.getUser);
router.get(
    "/:userID/shared",
    UserMiddleware.validateUserById,
    UserController.getPostsShared
);

router.post(
    "/register",
    UserMiddleware.validateRegisterUser,
    UserController.register
);
router.post("/login", UserMiddleware.validateLoginUser, UserController.login);

router.put(
    "/update/:userID",
    UserMiddleware.validateUserById,
    UserController.updateUser
);

router.delete("/delete-all", UserController.deleteAllUsers);
router.delete(
    "/delete/:userID",
    UserMiddleware.validateUserById,
    UserController.deleteUser
);

module.exports = router;
