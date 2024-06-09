const HotelIMGEtt = require("../data/entity/hotel.img.ett");
const IMGEtt = require("../data/entity/image.ett");

class HotelIMGSV {
  static async getAvatarImage(idHotel) {
    const htavt = await HotelIMGEtt.findOne({
      where: { idHotel: idHotel, isAvatar: true },
    });
    return await IMGEtt.findByPk(htavt.idImage);
  }
  static async setAvatar(idHotel, idImage) {
    const image = await IMGEtt.findByPk(idImage);
    if (!image) {
      return new Promise((resolve, reject) => {
        reject({ code: 404, message: "image not found" });
      });
    }
    const htimgavt = await HotelIMGEtt.findOne({
      where: { idHotel: idHotel, isAvatar: true },
    });
    if (htimgavt) {
      htimgavt.isAvatar = false;
      await htimgavt.save();
    }
    return await HotelIMGEtt.update(
      { isAvatar: true },
      { where: { idHotel: idHotel, idImage: idImage } }
    );
  }
  static async addHotelImage(idHotel, idImage) {
    const htavt = await HotelIMGEtt.findOne({
      where: { idHotel: idHotel, isAvatar: true },
    });
    if (!htavt) {
      return await HotelIMGEtt.create({
        idHotel: idHotel,
        idImage: idImage,
        isAvatar: true,
      });
    }
    return await HotelIMGEtt.create({ idHotel: idHotel, idImage: idImage });
  }
  static async deleteHotelImage(idHotel, idImage) {
    return await HotelIMGEtt.destroy({
      where: { idHotel: idHotel, idImage: idImage },
    });
  }
  static async getImagesId(idHotel) {
    const htimgs = await HotelIMGEtt.findAll({ where: { idHotel: idHotel } });
    const imgsId = htimgs.map((htimg) => htimg.idImage);
    return imgsId;
  }
}

module.exports = HotelIMGSV;
