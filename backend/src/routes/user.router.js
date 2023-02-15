const express = require("express");
const router = express.Router();

const UserModel = require("../models/userModel.model");
const users = require("../controllers/user.controller");

router.route("/").get(users.findAll);

// REGISTER
// router.post("/register", (req, res) => {
//     const username = req.body.username;
//     const psw = req.body.password;
//     const email = req.body.email;

//     UserModel.findOne({
//         username: username,
//     })
//         .then((data) => {
//             // check user have been created yet?
//             if (data) {
//                 res.status(400).json({
//                     msg: "username already have",
//                 });
//             } else {
//                 console.log(username);
//                 return UserModel.create({
//                     username: username,
//                     password: psw,
//                     email: email,
//                 });
//             }
//         })
//         .then((data) => {
//             res.status(200).json({
//                 msg: "success to create data",
//                 data: data,
//             });
//         })
//         .catch((err) => {
//             res.status(500).json({
//                 msg: "failed to create data",
//             });
//             console.log(err);
//         });
// });

// // LOGIN
// router.post("/login", (req, res) => {
//     const username = req.body.username;
//     const psw = req.body.password;

//     UserModel.findOne({
//         username: username,
//         password: psw,
//     })
//         .then((data) => {
//             if (data) {
//                 res.status(200).json({
//                     msg: "login success",
//                     data: data,
//                 });
//             } else {
//                 res.status(400).json({
//                     msg: "failed to login",
//                 });
//             }
//         })
//         .catch((err) => {
//             res.status(500).json({
//                 msg: "server faild",
//                 err: err,
//             });
//         });
// });

// //GET 1 USER
// router.get("/:id", async (req, res, next) => {
//     try {
//         const userId = await UserModel.findById(req.params.id);
//         if (!userId) {
//             return next("User not found!");
//         }
//         return res.status(200).send(userId);
//     } catch (err) {
//         return next(`Error retrieving user id with id=${(req.params.id, err)}`);
//     }
// });

// const PAGE_SIZE = 2;

// //PAGINATION
// router.get("/users", (req, res, next) => {
//     let page = req.query.page; // "4"

//     if (page) {
//         if (page < 1) {
//             page = 1;
//         }

//         //Get page
//         const pageNums = parseInt(page);
//         const skip = (pageNums - 1) * PAGE_SIZE; //bo qua 6

//         UserModel.find({})
//             .skip(skip)
//             .limit(PAGE_SIZE)
//             .then((data) => {
//                 res.status(200).json(data);
//             })
//             .catch((err) => {
//                 res.status(500).json({
//                     msg: err,
//                 });
//             });
//     } else {
//         // GET ALL
//         UserModel.find({})
//             .then((data) => {
//                 res.status(200).json(data);
//             })
//             .catch((err) => {
//                 res.status(500).json({
//                     msg: err,
//                 });
//             });
//     }
// });

module.exports = router;
