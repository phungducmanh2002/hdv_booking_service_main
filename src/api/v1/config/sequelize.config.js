const DBConfig = require("./db.config");
const sequelize = require("sequelize");

class SQLZConfig {
  static SQLZInstance = new sequelize(
    DBConfig.config.database,
    DBConfig.config.user,
    DBConfig.config.password,
    {
      host: DBConfig.config.host,
      dialect: DBConfig.config.dialect,
      logging: false,
    }
  );
}

module.exports = SQLZConfig;
