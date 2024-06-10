const SQLZConfig = require("../../../config/sequelize.config");
const { DataTypes, Model } = require("sequelize");
const BookRoomEtt = require("./book.room.ett");

class BookingEtt extends Model {}

BookingEtt.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    checkin: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkout: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    personName: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    personPhone: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        isIn: [[1, 2, 3, 4, 5, 6]],
      },
    },
  },
  {
    sequelize: SQLZConfig.SQLZInstance,
    freezeTableName: true,
    tableName: "booking",
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = BookingEtt;
