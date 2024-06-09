const express = require("express");
const IDXRouter = require("./main/router");
const FileHelper = require("./helper/file.helper");
const REQMDW = require("./middleware/req.mdw");
const IDXEtt = require("./main/data/entity/index.ett");
const DBConfig = require("./config/db.config");
const DataHelper = require("./helper/data.helper");
const app = express();
const IP = FileHelper.getEnv("IP");
const PORT = FileHelper.getEnv("PORT");

console.log(DataHelper.getArrRandom(10));

app.use(
  express.urlencoded({ extended: false }),
  express.json(),
  REQMDW.allowCors,
  IDXRouter.router
);

class APIV1 {
  static start() {
    app.listen(PORT, async () => {
      console.log(`API V1 LISTEN IN http://${IP}:${PORT}`);
      console.log("DB CONFIG");
      console.log(DBConfig.config);
      IDXEtt.do();
    });
  }
}

module.exports = APIV1;
