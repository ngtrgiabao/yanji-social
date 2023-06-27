const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlparser: true,
    useUnifiedTopology: true,
});

const videoSchema = new mongoose.Schema(
    {
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        videoUrl: String,
    },
    { timestamps: true }
);

const videoModel = mongoose.model("video", videoSchema);

module.exports = videoModel;
