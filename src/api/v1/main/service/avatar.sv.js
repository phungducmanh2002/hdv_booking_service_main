const AVTEtt = require("../data/entity/avatar.ett");
const IMGEtt = require("../data/entity/image.ett");

class AvatarSV {
  static async updateAvatar(idUser, idImage) {
    return await AVTEtt.create({ idUser: idUser, idImage: idImage });
  }
  static async getImage(idUser) {
    const avt = await AVTEtt.findOne({ where: { idUser: idUser } });
    return await IMGEtt.findByPk(avt.idImage);
  }
}

module.exports = AvatarSV;
