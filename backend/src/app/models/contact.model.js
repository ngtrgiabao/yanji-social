const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    contactName: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "Active",
    },
    additionalInfo: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  },
);

const Contact = mongoose.model("contacts", contactSchema);

module.exports = Contact;
