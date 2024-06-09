const RES = require("../payload/RES");
const BookingSV = require("../service/booking.sv");

class BookingCTL {
  static createBooking = [
    async (req, res, next) => {
      try {
        const {
          checkin,
          checkout,
          note,
          personName,
          personPhone,
          idUser,
          idRooms,
        } = req.body;

        // không cung cấp id rooms
        if (!idRooms || !idRooms.length) {
          res.json(RES.BadRequest.setMessage("invalid id rooms"));
          return;
        }
        const checkinDate = new Date(checkin);
        const checkoutDate = new Date(checkout);
        // không cung cấp checkin checkout hợp lệ
        if (
          !checkinDate ||
          !checkoutDate ||
          checkinDate.getTime() > checkoutDate.getTime()
        ) {
          res.json(RES.BadRequest.setMessage("invalid checkin checkout date"));
          return;
        }
        // kiểm tra trùng lặp thời gian đặt phòng
        const isValid = await BookingSV.isValidBooking(
          checkinDate,
          checkoutDate,
          idRooms
        );
        if (!isValid) {
          res.json(
            RES.BadRequest.setMessage("đặt phòng thất bại. phòng đã được đặt")
          );
          return;
        }

        const bk = await BookingSV.createBooking(
          checkin,
          checkout,
          note,
          personName,
          personPhone,
          idUser,
          idRooms
        );

        if (bk) {
          const newBooking = await BookingSV.getDetail(bk.id);
          res.json(RES.Created.setData(newBooking));
        } else {
          res.json(RES.ServerError);
        }
      } catch (error) {
        next(error);
      }
    },
  ];
  static getDetail = [
    async (req, res, next) => {
      try {
        const idBooking = req.params.idBooking;
        const bk = await BookingSV.getDetail(idBooking);
        if (!bk) {
          res.json(RES.NotFound.setData(bk));
        } else {
          res.json(RES.Oke.setData(bk));
        }
      } catch (error) {
        next(error);
      }
    },
  ];
  static updateStatus = [
    async (req, res, next) => {
      try {
        const idBooking = req.params.idBooking;
        const status = req.query.status;
        const bk = await BookingSV.updateStatus(idBooking, status);
        res.json(RES.Oke.setData(bk));
      } catch (error) {
        next(error);
      }
    },
  ];
}

module.exports = BookingCTL;
