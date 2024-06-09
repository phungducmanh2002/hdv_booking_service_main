require("dotenv").config();

class FileHelper {
  static getEnv(envName) {
    return process.env?.[envName];
  }
}

module.exports = FileHelper;
