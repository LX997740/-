const db = require("../db/index.js");
//导入bcrypt.js
const bcrypt = require("bcrypt");
//导入jwt,用于生成token
const jwt = require("jsonwebtoken");
const jwtconfig = require("../jwt_config/index.js");

exports.login = (req, res) => {
  const loginfo = req.body;
  // 第一步 查看数据表中有没有前端传过来的账号
  const sql = "select * from users where account = ?";
  db.query(sql, loginfo.account, (err, results) => {
    // 执行sql语句失败的情况 一般在数据库断开的情况会执行失败
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc("登录失败");

    // 第二步 对前端传过来的密码进行解密
    const compareResult = bcrypt.compareSync(
      loginfo.password,
      results[0].password
    );
    if (!compareResult) {
      return res.cc("登录失败");
    }
    // 第三步 对账号是否冻结做判定
    if (results[0].status == 1) {
      return res.cc("账号被冻结");
    }
    // 第四步 生成返回给前端的token
    // 剔除加密后的密码,头像,创建时间,更新时间
    const user = {
      ...results[0],
      password: "",
      imageUrl: "",
      create_time: "",
      update_time: "",
    };
    // 设置token的有效时长 有效期为7个小时
    const tokenStr = jwt.sign(user, jwtconfig.jwtSecretKey, {
      expiresIn: "7h",
    });
    res.send({
      results: results[0],
      status: 0,
      message: "登录成功",
      token: "Bearer " + tokenStr,
    });
  });
};
exports.register = (req, res) => {
  const reginfo = req.body;
  //判断前端传来的数据是否为空
  if (!reginfo.account || !reginfo.password) {
    return res.send({
      status: 1,
      msg: "用户名或密码不能为空",
    });
  }
  //判断账号是否存在
  const sql = `select * from users where account = ?`;
  db.query(sql, reginfo.account, (err, results) => {
    if (results.length > 0) {
      return res.send({
        status: 1,
        msg: "账号已存在",
      });
    }
    // 对密码进行加密 使用中间件bcrypt.js
    //第一个参数是密码 第二个参数是加密的长度
    reginfo.password = bcrypt.hashSync(reginfo.password, 10);
    //把数据插入数据库
    const sql1 = `insert into users set ?`;
    const identity = "管理员";
    const create_time = new Date();
    db.query(
      sql1,
      {
        account: reginfo.account,
        password: reginfo.password,
        identity,
        create_time,
        status: 0,
      },
      (err, results) => {
        if (results.affectedRows !== 1) {
          return res.send({
            status: 1,
            msg: "注册失败",
          });
        }
        res.send({
          status: 0,
          msg: "注册成功",
        });
      }
    );
  });
};
