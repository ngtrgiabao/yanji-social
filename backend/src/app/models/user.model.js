const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const postShared = new mongoose.Schema(
  {
    postID: {
      type: String,
    },
  },
  { timestamps: true },
);

const postSaved = new mongoose.Schema(
  {
    postID: {
      type: String,
    },
  },
  { timestamps: true },
);

const blackList = new mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      max: 100,
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
      max: 50,
    },
    firstName: {
      type: String,
      default: "",
      max: 100,
    },
    lastName: {
      type: String,
      default: "",
      max: 100,
    },
    photos: [
      {
        name: {
          type: String,
        },
      },
    ],
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
    gender: {
      type: Boolean,
      default: false,
    },
    insta: {
      type: String,
      default: "",
    },
    linkedin: {
      type: String,
      default: "",
    },
    github: {
      type: String,
      default: "",
    },
    pinterest: {
      type: String,
      default: "",
    },
    youtube: {
      type: String,
      default: "",
    },
    twitter: {
      type: String,
      default: "",
    },
    twitch: {
      type: String,
      default: "",
    },
    borderAvatar: {
      type: String,
      default: "",
    },
    postShared: [postShared],
    blackList: [blackList],
    postSaved: [postSaved],
    isVerifyEmail: { type: Boolean, default: false },
    isVerify: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const userModel = mongoose.model("user", User);

module.exports = userModel;
