const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const audioSchema = new mongoose.Schema(
  {
    userID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    audioUrl: {
      type: String,
      default: "",
    },
    cover: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "New audio",
    },
    playTime: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const audioModel = mongoose.model("audio", audioSchema);

module.exports = audioModel;
