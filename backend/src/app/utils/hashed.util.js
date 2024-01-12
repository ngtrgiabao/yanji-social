const { genSalt, hash } = require("bcrypt");

class HashedUtil {
  async saltHash(password) {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  }
}

const hashedUtil = new HashedUtil();

module.exports = hashedUtil