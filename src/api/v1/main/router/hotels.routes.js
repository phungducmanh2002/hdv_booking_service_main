const { Router } = require("express");
const RequestHelper = require("../../helper/request.hepler");
const HotelCTL = require("../controller/hotel.ctl");
const router = Router();

router.get("/:idHotel/bookings", HotelCTL.getAllBookings);
router.get(
  "/:idHotel/room-class/:idRoomClass/rooms/can-booking",
  HotelCTL.getAllRoomsCanBooking
);

class HotelRT {
  static router = router;
}

module.exports = HotelRT;
