const RES = require("../main/payload/RES");

class EXMDW {
  static handleErr = [
    (err, req, res, next) => {
      console.log(`\nERR: ** ${err.message} **\n`);
      if (err.code && parseInt(err.code)) {
        res.json(RES.CLONE(err));
      } else {
        res.json(RES.ServerError.setMessage(err.message));
      }
    },
  ];
}

module.exports = EXMDW;
