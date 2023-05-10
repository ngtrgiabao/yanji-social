const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlparser: true,
    useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const Message = new Schema(
    {
        text: {
            type: [String],
        },
        media: String,
        file: String,
        userIDs: Array,
    },
    { timestamps: true }
);

const messageModel = mongoose.model("messages", Message);

module.exports = messageModel;
