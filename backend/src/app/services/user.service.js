const { compare } = require("bcrypt");

const UserModel = require("../models/user.model");
const hashedUtil = require("../utils/hashed.util");

class UserService {
  createUser = async (username, password, email) => {
    const hashedPassword = await hashedUtil.saltHash(password);

    const user = UserModel.create({
      username,
      password: hashedPassword,
      email,
    });

    return user;
  };

  checkPassword = async (user, password) => {
    return await compare(password, user.password);
  };

  findUserByUsername = async (username) => {
    const user = await UserModel.findOne({ username: username });
    return user;
  };
}

const userService = new UserService();

module.exports = {
  userService,
};
