const RES = require("../payload/RES");
const BookingSV = require("../service/booking.sv");

class HotelCTL {
  static getAllBookings = [
    async (req, res, next) => {
      try {
        const idHotel = req.params.idHotel;
        const status = req.query.status;
        const bookings = await BookingSV.getAllHotelBookings(idHotel, status);
        res.json(RES.Oke.setData(bookings));
      } catch (error) {
        next(error);
      }
    },
  ];

  static getAllRoomsCanBooking = [
    async (req, res, next) => {
      try {
        const idHotel = req.params.idHotel;
        const idRoomClass = req.params.idRoomClass;
        const startTime = req.query.startTime;
        const endTime = req.query.endTime;
        const startTimeDate = new Date(startTime);
        const endTimeDate = new Date(endTime);

        if (startTimeDate.getTime() > endTimeDate.getTime()) {
          return res.json(
            RES.BadRequest.setMessage("invalid start time & end time")
          );
        }
        if (!idHotel) {
          return res.json(RES.BadRequest.setMessage("invalid id hotel"));
        }
        if (!idRoomClass) {
          return res.json(RES.BadRequest.setMessage("invalid id room class"));
        }

        const rooms = await BookingSV.getAllRoomsCanBooking(
          idHotel,
          idRoomClass,
          startTimeDate,
          endTimeDate
        );

        res.json(RES.Oke.setData(rooms));
      } catch (error) {
        next(error);
      }
    },
  ];
}

module.exports = HotelCTL;
