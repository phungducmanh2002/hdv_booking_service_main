const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWTConfig = require("../config/jwt.config");

class DataHelper {
  static GenStringNumber(length) {
    let result = "";
    const characters = "0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  static HashString(value) {
    return bcrypt.hashSync(value, 8);
  }
  static CompareStrHash(str, hashString) {
    return bcrypt.compareSync(str, hashString);
  }
  static genToken(id) {
    const token = jwt.sign({ id: id }, JWTConfig.secret, JWTConfig.options);
    return token;
  }
  static getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  static getArrRandom(n, startValue = 0) {
    const arr = [];
    for (let i = 0; i < n; i++) {
      arr.push(startValue++);
    }
    for (let i = 0; i < arr.length - 1; i++) {
      const ridx = DataHelper.getRandomNumber(i + 1, n - 1);
      const tmp = arr[i];
      arr[i] = arr[ridx];
      arr[ridx] = tmp;
    }
    return arr;
  }
}

module.exports = DataHelper;
