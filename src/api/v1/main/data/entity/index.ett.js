const DBConfig = require("../../../config/db.config");
const SQLZConfig = require("../../../config/sequelize.config");
const FileHelper = require("../../../helper/file.helper");
const BookRoomEtt = require("./book.room.ett");
const BookingEtt = require("./booking.ett");

BookingEtt.hasMany(BookRoomEtt, { as: "rooms", foreignKey: "idBooking" });
BookRoomEtt.belongsTo(BookingEtt, { as: "booking", foreignKey: "idBooking" });

const DB_GEN = FileHelper.getEnv("DB_GEN");
class IDXEtt {
  static async do() {
    if (DB_GEN == 1) {
      console.log("create table ...");
      await SQLZConfig.SQLZInstance.sync({ force: true });
      console.log("create table finish!");
    }
  }
}

module.exports = IDXEtt;
