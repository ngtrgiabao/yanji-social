const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    userID: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
        max: 500,
    },
});

const postSchema = new mongoose.Schema(
    {
        userID: {
            type: String,
            required: true,
        },
        desc: {
            type: String,
            max: 500,
        },
        img: {
            type: String,
        },
        likes: {
            type: Array,
            default: [],
        },
        comments: [commentSchema],
        shares: {
            type: Array,
            default: [],
        },
    },
    { timestamps: true }
);

const Post = mongoose.model("post", postSchema);
module.exports = Post;
