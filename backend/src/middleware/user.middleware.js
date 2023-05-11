const { ObjectId } = require("mongodb");
const User = require("../models/user.model");

// Middleware to validate user data before account creation
const validateRegisterUser = (req, res, next) => {
    const { username, password, email } = req.body;

    // Check if all required fields are present
    if (!username || !password || !email) {
        console.error(`Please provide all required fields`, error);
        return res
            .status(404)
            .json({ message: "Please provide all required fields" });
    }

    // Check if username already exists
    User.findOne({ username: username })
        .then((existingUser) => {
            if (existingUser) {
                console.error(`Username ${existingUser} already exists`, error);
                return res.status(404).json({
                    message: `Username ${existingUser} already exists`,
                });
            }
            next(); // Proceed to account creation if all checks pass
        })
        .catch((error) => {
            console.error("Error while checking username existence:", error);
            return res
                .status(500)
                .json({ msg: "Error while checking username existence" });
        });
};

// Middleware to validate user login data
const validateLoginUser = (req, res, next) => {
    const { username, password } = req.body;

    // Check if all required fields are present
    if (!username || !password) {
        console.error(`Please provide your username and password`, error);
        return res
            .status(404)
            .json({ message: "Please provide your username and password" });
    }

    // Check if the username and password match a user in the database
    User.findOne({ username: username, password: password })
        .then((user) => {
            if (!user) {
                console.error(`Invalid username or password`, error);
                return res
                    .status(401)
                    .json({ message: "Invalid username or password" });
            }
            req.user = user; // Attach the user object to the request for later use
            next(); // Proceed to authentication if all checks pass
        })
        .catch((error) => {
            console.error("An error occur while validating user login:", error);
            return res.status(500).json({
                message: "An error occur while validating user login",
            });
        });
};

// Middleware to validate and retrieve user account by ID
const getUserById = (req, res, next) => {
    const userID = req.params.userID;
    // Check if the user ID is valid
    if (!userID || !User.findById(ObjectId(userID))) {
        console.error(`Invalid user ID`, error);
        return res.status(401).json({ message: "Invalid user ID" });
    }

    User.findById(userID)
        .then((user) => {
            if (!user) {
                console.error(`User not found`, error);
                return res.status(404).json({ message: "User not found" });
            }
            req.user = user; // Attach the user object to the request for later use
            next(); // Proceed to the next middleware or route handler
        })
        .catch((error) => {
            console.error(
                "An error occur while retrieving user account:",
                error
            );
            return res.status(500).json({
                message: "An error occur while retrieving user account",
            });
        });
};

module.exports = {
    validateRegisterUser,
    validateLoginUser,
    getUserById,
};
