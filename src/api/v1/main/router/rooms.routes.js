const { Router } = require("express");
const RequestHelper = require("../../helper/request.hepler");
const RoomCTL = require("../controller/room.ctl");
const router = Router();

router.get("/:idRoom/bookings", RoomCTL.getAllBookings);

class RoomRT {
  static router = router;
}

module.exports = RoomRT;
