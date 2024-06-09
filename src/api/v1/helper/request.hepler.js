const multer = require("multer");

class RequestHelper {
  static uploadFile = multer({ storage: multer.memoryStorage() });
  static getBearerToken(req) {
    const bearerToken = req?.headers?.authorization;
    const accessToken = bearerToken?.slice(7);
    return accessToken;
  }
}

module.exports = RequestHelper;
