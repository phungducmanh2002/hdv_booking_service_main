const { Router } = require("express");
const RequestHelper = require("../../helper/request.hepler");
const UserCTL = require("../controller/user.ctl");
const router = Router();

router.get("/:idUser/bookings", UserCTL.getAllBookings);

class UserRT {
  static router = router;
}

module.exports = UserRT;
