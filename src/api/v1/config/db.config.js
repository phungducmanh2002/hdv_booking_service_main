const FileHelper = require("../helper/file.helper");

const DB_IP = FileHelper.getEnv("DB_IP");
const DB_PORT = FileHelper.getEnv("DB_PORT");
const DB_DIALECT = FileHelper.getEnv("DB_DIALECT");
const DB_NAME = FileHelper.getEnv("DB_NAME");
const DB_USER = FileHelper.getEnv("DB_USER");
const DB_PASS = FileHelper.getEnv("DB_PASS");
const DB_GEN = FileHelper.getEnv("DB_GEN");

class DBConfig {
  static config = {
    host: DB_IP,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    dialect: DB_DIALECT,
  };
}

module.exports = DBConfig;
