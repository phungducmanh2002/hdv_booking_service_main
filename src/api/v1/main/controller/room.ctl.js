const RES = require("../payload/RES");
const BookingSV = require("../service/booking.sv");

class RoomCTL {
  static getAllBookings = [
    async (req, res, next) => {
      try {
        const idRoom = req.params.idRoom;
        const status = req.query.status;
        const bookings = await BookingSV.getAllRoomBookings([idRoom], status);
        res.json(RES.Oke.setData(bookings));
      } catch (error) {
        next(error);
      }
    },
  ];
}

module.exports = RoomCTL;
