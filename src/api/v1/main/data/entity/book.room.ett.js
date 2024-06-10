const SQLZConfig = require("../../../config/sequelize.config");
const { DataTypes, Model } = require("sequelize");
const DataHelper = require("../../../helper/data.helper");

class BookRoomEtt extends Model {}

BookRoomEtt.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idBooking: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idRoom: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize: SQLZConfig.SQLZInstance,
    freezeTableName: true,
    tableName: "book_room",
    indexes: [
      {
        unique: true,
        fields: ["idBooking", "idRoom"],
      },
    ],
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = BookRoomEtt;
