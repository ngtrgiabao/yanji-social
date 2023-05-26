const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlparser: true,
    useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: {
            type: String,
            require: true,
            min: 3,
            max: 20,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        profilePicture: {
            type: String,
            default: null,
        },
        coverPicture: {
            type: String,
            default: null,
        },
        bio: {
            type: String,
            default: "",
        },
        firstName: {
            type: String,
            default: "",
        },
        lastName: {
            type: String,
            default: "",
        },
        desc: {
            type: String,
            max: 50,
        },
        photos: [
            {
                name: {
                    type: String,
                },
            },
        ],
        friends: {
            type: Array,
            default: [],
        },
        followers: {
            type: Array,
            default: [],
        },
        followings: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

const userModel = mongoose.model("user", User);

module.exports = userModel;
