const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlparser: true,
    useUnifiedTopology: true,
});

const imageSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        imageUrl: String,
    },
    { timestamps: true }
);

const imageModel = mongoose.model("image", imageSchema);

module.exports = imageModel;
