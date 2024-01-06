const mongoose = require("mongoose");

const blockListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  blockedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const BlockList = mongoose.model("blockList", blockListSchema);

module.exports = BlockList;
