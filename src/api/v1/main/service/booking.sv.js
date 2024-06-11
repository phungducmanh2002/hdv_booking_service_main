const { Op } = require("sequelize");
const HotelAPI = require("../../axios/hotel.api");
const SQLZConfig = require("../../config/sequelize.config");
const BookRoomEtt = require("../data/entity/book.room.ett");
const BookingEtt = require("../data/entity/booking.ett");
const RES = require("../payload/RES");

class BookingSV {
  static async createBooking(
    checkin,
    checkout,
    note,
    personName,
    personPhone,
    idUser,
    idRooms
  ) {
    const result = await SQLZConfig.SQLZInstance.transaction(async (t) => {
      const booking = await BookingEtt.create(
        { checkin, checkout, note, personName, personPhone, idUser, status: 1 },
        { transaction: t }
      );
      const bookRooms = [];
      for (let i = 0; i < idRooms.length; i++) {
        const idRoom = idRooms[i];
        const r = await HotelAPI.getRoomPrice(idRoom);
        const room = r.data.data;
        bookRooms.push({
          idBooking: booking.id,
          idRoom: idRoom,
          roomPrice: room.roomPrice,
        });
      }
      await BookRoomEtt.bulkCreate(bookRooms, { transaction: t });
      return booking;
    });
    return result;
  }
  static async getDetail(id) {
    const bookingDetail = await BookingEtt.findByPk(id, {
      include: {
        model: BookRoomEtt,
        as: "rooms",
        attributes: ["id", "idRoom", "roomPrice"],
      },
    });

    if (bookingDetail) {
      const bookRooms = bookingDetail.rooms;
      const booking = { ...bookingDetail.dataValues, rooms: [] };
      const rooms = [];
      for (let i = 0; i < bookRooms.length; i++) {
        const bookRoom = bookRooms[i];
        const roomClass = await HotelAPI.getRoomClass(bookRoom.idRoom);
        rooms.push({
          id: bookRoom.id,
          idRoom: bookRoom.idRoom,
          roomPrice: bookRoom.roomPrice,
          roomClassName: roomClass.name,
        });
      }
      booking.rooms = rooms;
      return booking;
    }

    return bookingDetail;
  }
  static async updateStatus(id, newStatus) {
    const bk = await BookingEtt.findByPk(id);
    let isFailed = false;
    newStatus = parseInt(newStatus);

    switch (newStatus) {
      case 2: {
        if (bk.status == 1) {
          bk.status = 2;
        } else {
          isFailed = true;
        }
        break;
      }
      case 3: {
        if (bk.status == 1 || bk.status == 2) {
          bk.status = 3;
        } else {
          isFailed = true;
        }
        break;
      }
      case 4: {
        if (bk.status == 3) {
          bk.status = 4;
        } else {
          isFailed = true;
        }
        break;
      }
      case 5: {
        if (bk.status == 1 || bk.status == 2) {
          bk.status = 5;
        } else {
          isFailed = true;
        }
        break;
      }
      default: {
        isFailed = true;
        break;
      }
    }

    if (isFailed) {
      return new Promise((resolve, reject) => {
        reject(RES.BadRequest.setMessage("update booking status failed"));
      });
    }
    return await bk.save();
  }
  static async isValidBooking(checkinDate, checkoutDate, idRooms) {
    const conflictingBookings = await BookingEtt.findAll({
      where: {
        [Op.or]: [
          {
            // newCheckin_______checkin_______newCheckout
            // một booking nào có ngày checkin nằm trong thời gian booking của new booking
            checkin: { [Op.between]: [checkinDate, checkoutDate] },
          },
          {
            // newCheckin_______checkout_______newCheckout
            // một booking nào có ngày checkout nằm trong thời gian booking của new booking
            checkout: { [Op.between]: [checkinDate, checkoutDate] },
          },
          {
            // checkin_______newCheckin___newCheckout______checkout
            [Op.and]: [
              { checkin: { [Op.lte]: checkinDate } },
              { checkout: { [Op.gte]: checkoutDate } },
            ],
          },
        ],
      },
      include: [
        {
          model: BookRoomEtt,
          as: "rooms",
          where: {
            idRoom: { [Op.in]: idRooms },
          },
        },
      ],
    });

    if (conflictingBookings.length > 0) {
      return false; // Có xung đột
    }
    return true;
  }
  static async getAllUserBookings(idUser, status) {
    const condition = {
      idUser: idUser,
    };
    if (status) {
      condition.status = status;
    }
    return await BookingEtt.findAll({
      where: condition,
    });
  }
  static async getAllRoomBookings(idRooms, status) {
    const condition = {};
    if (status) {
      condition.status = status;
    }
    return await BookingEtt.findAll({
      where: condition,
      include: [
        {
          model: BookRoomEtt,
          as: "rooms",
          attributes: [],
          where: {
            idRoom: {
              [Op.in]: idRooms,
            },
          },
        },
      ],
    });
  }
  static async getAllHotelBookings(idHotel, status) {
    const rooms = (await HotelAPI.getRooms(idHotel)).data.data;
    if (!rooms) {
      throw { message: "gọi api hotel rooms thất bại" };
    }
    const idRooms = rooms.map((room) => room.id);
    return await BookingSV.getAllRoomBookings(idRooms, status);
  }

  static async getAllBooksRoom(startTimeDate, endTimeDate) {
    const checkinDate = startTimeDate;
    const checkoutDate = endTimeDate;
    return await BookRoomEtt.findAll({
      include: [
        {
          attributes: [],
          model: BookingEtt,
          as: "booking",
          where: {
            [Op.or]: [
              {
                // newCheckin_______checkin_______newCheckout
                // một booking nào có ngày checkin nằm trong thời gian booking của new booking
                checkin: { [Op.between]: [checkinDate, checkoutDate] },
              },
              {
                // newCheckin_______checkout_______newCheckout
                // một booking nào có ngày checkout nằm trong thời gian booking của new booking
                checkout: { [Op.between]: [checkinDate, checkoutDate] },
              },
              {
                // checkin_______newCheckin___newCheckout______checkout
                [Op.and]: [
                  { checkin: { [Op.lte]: checkinDate } },
                  { checkout: { [Op.gte]: checkoutDate } },
                ],
              },
            ],
          },
        },
      ],
    });
  }
  static async getAllRoomsCanBooking(
    idHotel,
    idRoomClass,
    startTimeDate,
    endTimeDate
  ) {
    /**
     * get all rooms from hotel server
     * filter
     */
    const res = await HotelAPI.getHotelRoomByRoomClass(idHotel, idRoomClass);
    const rooms = res.data.data;
    const booksRoom = await BookingSV.getAllBooksRoom(
      startTimeDate,
      endTimeDate
    );
    booksRoom.map((e) => {
      console.log(e.get({ plain: true }));
    });
    const idRooms = rooms.map((room) => room.id);
    const idRoomsBook = booksRoom.map((roomBook) => roomBook.idRoom);
    let result = rooms.filter((item) => !idRoomsBook.includes(item.id));
    return result;
  }
}

module.exports = BookingSV;
