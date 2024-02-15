// 导入express
const express = require("express");
const Joi = require("joi");
// 导入路由
const router = express.Router();
// 导入login的路由处理模块
const loginHandler = require("../router_handle/login");
//导入express-joi
const expressJoi = require("@escook/express-joi");
//导入验证规则
const { login_limit } = require("../limit/login");

router.post("/register", expressJoi(login_limit), loginHandler.register);
router.post("/login", expressJoi(login_limit), loginHandler.login);

module.exports = router;
