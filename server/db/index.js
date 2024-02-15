//和数据库连接的相关操作
var mysql = require("mysql2");

//创建与数据库的连接
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "back_system",
});

module.exports = db;
