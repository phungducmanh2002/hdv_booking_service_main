const { Router } = require("express");
const RequestHelper = require("../../helper/request.hepler");
const BookingCTL = require("../controller/booking.ctl");
const router = Router();

router.get("/:idBooking", BookingCTL.getDetail);
router.put("/:idBooking", BookingCTL.updateStatus);
router.post("", BookingCTL.createBooking);

class BookingRT {
  static router = router;
}

module.exports = BookingRT;
