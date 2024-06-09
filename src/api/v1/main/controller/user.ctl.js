const RES = require("../payload/RES");
const BookingSV = require("../service/booking.sv");

class UserCTL {
  static getAllBookings = [
    async (req, res, next) => {
      try {
        const idUser = req.params.idUser;
        const status = req.query.status;
        const bookings = await BookingSV.getAllUserBookings(idUser, status);
        res.json(RES.Oke.setData(bookings));
      } catch (error) {
        next(error);
      }
    },
  ];
}

module.exports = UserCTL;
