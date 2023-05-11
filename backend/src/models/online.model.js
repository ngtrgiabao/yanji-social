const mongoose = require("mongoose");

const onlinePresenceSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        lastSeen: {
            type: Date,
            default: Date.now,
        },
        status: {
            type: String,
            enum: ["Online", "Offline"],
            default: "Offline",
        },
    },
    {
        timestamps: true,
    }
);

const OnlinePresence = mongoose.model("onlinePresences", onlinePresenceSchema);

module.exports = OnlinePresence;
