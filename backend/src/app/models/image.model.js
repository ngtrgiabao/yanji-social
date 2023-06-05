const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlparser: true,
    useUnifiedTopology: true,
});

const imageSchema = new mongoose.Schema(
    {
        // userId: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "user",
        //     require: true,
        // },
        imgName: String,
        image: {
            data: Buffer,
            contentType: String,
        },
    },
    { timestamps: true }
);

const imageModel = mongoose.model("image", imageSchema);

module.exports = imageModel;
