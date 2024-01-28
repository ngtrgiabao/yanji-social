const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const Image = new Schema(
  {
    userID: {
      type: String,
      ref: "user",
      required: true,
    },
    imageUrl: String,
  },
  { timestamps: true },
);

const imageModel = mongoose.model("image", Image);

module.exports = imageModel;
