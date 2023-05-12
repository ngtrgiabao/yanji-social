const UserModel = require("../models/user.model");
const MongoDB = require("../utils/mongodb.utils");
const UserService = require("../services/user.service");

// REGISTER
const register = (req, res, next) => {
    const { username, password, email } = req.body;

    UserModel.create({
        username,
        password,
        email,
    })
        .then((data) => {
            return res.status(200).json({
                msg: "Successfully created user",
                data,
            });
        })
        .catch((error) => {
            console.error(`Failed to create user ${username}`, error);
            return res.status(500).json({ msg: "Failed to create user" });
        });
};

// LOGIN
const login = (req, res, next) => {
    const { username, password } = req.body;

    UserModel.findOne({ username: username, password: password })
        .then((data) => {
            res.status(200).json({ msg: "Login success", data: data });
        })
        .catch((error) => {
            console.error(`Failed to login`, error);
            res.status(500).json({ msg: "Failed to login" });
        });
};

// GET USER BY ID
const getUserById = async (req, res, next) => {
    const userId = await UserModel.findById(req.params.userID);

    return res.status(200).json({
        msg: userId,
    });
};

module.exports = {
    register,
    login,
    getUserById,
};
