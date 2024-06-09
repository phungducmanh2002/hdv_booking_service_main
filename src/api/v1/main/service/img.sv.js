const IMGEtt = require("../data/entity/image.ett");

class ImageSV {
  static async createImage(buffer) {
    return await IMGEtt.create({ data: buffer });
  }
  static async deleteImage(id) {
    return await IMGEtt.destroy({ where: { id: id } });
  }

  static async getImageById(id) {
    return await IMGEtt.findByPk(id);
  }
}

module.exports = ImageSV;
