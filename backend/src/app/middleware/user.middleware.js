const User = require("../models/user.model");
const { userService } = require("../services/user.service");

class UserMiddleware {
  // Middleware to validate user data before account creation
  validateRegisterUser = async (req, res, next) => {
    const { username, password, email } = req.body;

    // Check if all required fields are present
    if (!username || !password || !email) {
      console.error(`Please provide all required fields`, error);
      return res
        .status(404)
        .json({ message: "Please provide all required fields" });
    }

    // Check if username already exists
    await User.findOne({ username: username })
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
  validateLoginUser = async (req, res, next) => {
    const { username, password } = req.body;

    try {
      const user = await userService.findUserByUsername(username);
      const isValidPassword = await userService.checkPassword(user, password);

      if (!isValidPassword) {
        console.error(`Invalid username or password`);
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      req.user = user; // Attach the user object to the request for later use
      next(); // Proceed to authentication if all checks pass
    } catch (error) {
      console.error("An error occurred while validating user login:", error);
      return res.status(500).json({
        message: "An error occurred while validating user login",
      });
    }
  };

  // Middleware to validate and retrieve user account by ID
  validateUserById = async (req, res, next) => {
    const userID = req.params.userID;

    try {
      const validUser = await User.findById(userID);
      // Check if the user ID is valid
      if (!validUser) {
        console.error(`Invalid user ID`);
        return res.status(401).json({ message: "Invalid user ID" });
      }

      next();
    } catch (error) {
      console.error("An error occur while retrieving user account:", error);
      console.log(userID);
      return res.status(500).json({
        message: "An error occur while retrieving user account",
        error,
      });
    }
  };
}

const userMiddleware = new UserMiddleware();

module.exports = {
  userMiddleware,
};
