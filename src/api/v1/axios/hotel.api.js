const DataHelper = require("../helper/data.helper");

class HotelAPI {
  static async getRoomPrice(idRoom) {
    return new Promise((resolve, reject) => {
      const roomPrice = DataHelper.getRandomNumber(100000, 1000000);
      resolve({ roomPrice: roomPrice });
    });
  }

  static async getRoomClass(idRoom) {
    return new Promise((resolve, reject) => {
      resolve({ name: "single queen" });
    });
  }

  static async getRooms(idHotel) {
    return new Promise((resolve, reject) => {
      const arr = DataHelper.getArrRandom(10, 2);
      const rooms = arr.map((num) => {
        return {
          id: num,
        };
      });
      resolve(rooms);
    });
  }

  static async getRooms(idHotel, idRoomClass) {
    return new Promise((resolve, reject) => {
      const arr = DataHelper.getArrRandom(10, 2);
      const rooms = arr.map((num) => {
        return {
          id: num,
        };
      });
      resolve(rooms);
    });
  }
}

module.exports = HotelAPI;
