const { Router } = require("express");
const RES = require("../payload/RES");
const EXMDW = require("../../middleware/ex.mdw");
const HotelRT = require("./hotels.routes");
const RoomRT = require("./rooms.routes");
const UserRT = require("./users.routes");
const BookingRT = require("./bookings.routes");
const router = Router();

router.use("/hotels", HotelRT.router);
router.use("/rooms", RoomRT.router);
router.use("/users", UserRT.router);
router.use("/bookings", BookingRT.router);
router.use(EXMDW.handleErr);

class IDXRouter {
  static router = router;
}

module.exports = IDXRouter;
