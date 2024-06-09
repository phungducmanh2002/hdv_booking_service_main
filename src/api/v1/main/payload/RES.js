class RES {
  constructor(code, message, data) {
    this.code = code;
    this.message = message;
    this.data = data;
  }

  setCode(code) {
    this.code = code;
    return this;
  }

  setData(data) {
    this.data = data;
    return this;
  }

  setMessage(message) {
    this.message = message;
    return this;
  }
  static CLONE(err) {
    return new RES(err.code, err.message, err.data);
  }
  static NEW = new RES();
  static Oke = new RES().setCode(200).setMessage("success");
  static Created = new RES().setCode(201).setMessage("created");
  static BadRequest = new RES().setCode(400).setMessage("bad request");
  static Forbiden = new RES().setCode(403).setMessage("forbiden");
  static NotFound = new RES().setCode(404).setMessage("not found");
  static ServerError = new RES().setCode(500).setMessage("server err");
  static Developing = new RES()
    .setCode(404)
    .setMessage("chức năng chưa phát triển");
}

module.exports = RES;
