const express = require("express");
const router = express.Router();

const UserMiddleware = require("../middleware/user.middleware");
const UserController = require("../controllers/user.controller");

router.get("/", (req, res) => {
    res.send({ msg: "Hello from user :D" });
});
router.get(
    "/:userID",
    UserMiddleware.validateUserById,
    UserController.getUserById
);

router.post(
    "/register",
    UserMiddleware.validateRegisterUser,
    UserController.register
);
router.post("/login", UserMiddleware.validateLoginUser, UserController.login);

module.exports = router;
