const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);

/*
1. We’re using the mongoose.connect() method to connect to our MongoDB database.
2. We’re using the process.env.MONGODB_URI variable to get the URI of our MongoDB database.
3. We’re using the useNewUrlparser option to eliminate a deprecation warning.
4. We’re using the useUnifiedTopology option to eliminate a deprecation warning.
*/
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlparser: true,
    useUnifiedTopology: true,
});

const Schema = mongoose.Schema;

const User = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const userModel = mongoose.model("user", User);

module.exports = userModel;
