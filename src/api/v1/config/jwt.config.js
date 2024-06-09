const FileHelper = require("../helper/file.helper");

const JWT_SECRET = FileHelper.getEnv("JWT_SECRET");
const JWT_TIME = FileHelper.getEnv("JWT_TIME");
const JWT_ALGORITH = FileHelper.getEnv("JWT_ALGORITH");

class JWTConfig {
  static secret = JWT_SECRET;
  static options = {
    algorithm: JWT_ALGORITH,
    allowInsecureKeySizes: true,
    expiresIn: JWT_TIME,
  };
}

module.exports = JWTConfig;
