class REQMDW {
  static allowCors = [
    (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*"); // Cho phép truy cập từ bất kỳ domain nào
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Các phương thức được phép
      res.header("Access-Control-Allow-Headers", "Content-Type, Authorization"); // Các header được phép
      next();
    },
  ];
}

module.exports = REQMDW;
