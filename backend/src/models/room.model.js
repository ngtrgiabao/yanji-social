const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        participants: {
            type: [String],
        },
        messages: {
            type: [String],
        },

        settings: {
            notifications: {
                type: Boolean,
                default: true,
            },
            sound: {
                type: Boolean,
                default: true,
            },
            theme: {
                type: String,
                default: "light",
            },
            private: {
                type: Boolean,
                default: false,
            },
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const ChatRoom = mongoose.model("chat-room", chatRoomSchema);

module.exports = ChatRoom;
