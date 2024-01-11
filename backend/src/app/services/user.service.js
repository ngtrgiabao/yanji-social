const { compare, genSalt, hash } = require("bcrypt");

const UserModel = require("../models/user.model");

class UserService {
  createUser = async (username, password, email, otpCode) => {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);

    const user = UserModel.create({
      username,
      password: hashedPassword,
      email,
    })

    return user;
  };

  checkPassword = async (user, password) => {
    return await compare(password, user.password);
  }

  findUserByUsernameAndPassword = async (username, password) => {
    const user = await  UserModel.findOne({ username: username, password: password })
    return user;
  }

  findUserByUsername = async (username) => {
    const user = await  UserModel.findOne({ username: username })
    return user;
  }
}

const userService = new UserService();

module.exports = {
  userService,
}
