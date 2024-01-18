const { genSalt, hash } = require("bcrypt");

class HashedUtil {
  saltHash = async (password) => {
    const salt = await genSalt();
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  };
}

const hashedUtil = new HashedUtil();

module.exports = hashedUtil;
