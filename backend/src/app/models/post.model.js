const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      max: 500,
    },
  },
  { timestamps: true },
);

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
      default: null,
    },
    video: {
      type: String,
      default: null,
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
    isEdited: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const Post = mongoose.model("post", postSchema);
module.exports = Post;
