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
            require: true,
        },
        media: String,
        file: String,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        receiver: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        isRead: {
            type: Boolean,
            default: false,
        },
        userIDs: Array,
    },
    { timestamps: true }
);

const messageModel = mongoose.model("message", Message);

module.exports = messageModel;
