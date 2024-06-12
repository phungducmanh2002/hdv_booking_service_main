const { default: axios } = require("axios");
const DataHelper = require("../helper/data.helper");
const FileHelper = require("../helper/file.helper");

const nginxIP = FileHelper.getEnv("NGINX_IP");
const nginxPORT = FileHelper.getEnv("NGINX_PORT");

class HotelAPI {
  static baseUrl = `http://${nginxIP}:${nginxPORT}/hotel`;

  static async getRoomPrice(idRoom) {
    const url = `${HotelAPI.baseUrl}/rooms/${idRoom}/room-price`;
    return axios.get(url);
    // return new Promise((resolve, reject) => {
    //   const roomPrice = DataHelper.getRandomNumber(100000, 1000000);
    //   resolve({ roomPrice: roomPrice });
    // });
  }

  static async getRoomClass(idRoom) {
    return new Promise((resolve, reject) => {
      resolve({ name: "single queen" });
    });
  }

  static async getRooms(idHotel) {
    const url = `${HotelAPI.baseUrl}/hotels/${idHotel}/rooms`;
    return axios.get(url);
    // return new Promise((resolve, reject) => {
    //   const arr = DataHelper.getArrRandom(10, 2);
    //   const rooms = arr.map((num) => {
    //     return {
    //       id: num,
    //     };
    //   });
    //   resolve(rooms);
    // });
  }

  static async getHotelRoomByRoomClass(idHotel, idRoomClass) {
    const url = `${HotelAPI.baseUrl}/hotels/${idHotel}/room-classes/${idRoomClass}/rooms`;
    return axios.get(url);

    // return new Promise((resolve, reject) => {
    //   const arr = DataHelper.getArrRandom(10, 2);
    //   const rooms = arr.map((num) => {
    //     return {
    //       id: num,
    //     };
    //   });
    //   resolve(rooms);
    // });
  }
}

module.exports = HotelAPI;
