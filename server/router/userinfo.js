// 导入express
const express = require("express");
// 导入路由
const router = express.Router();
//导入express-joi
const expressJoi = require("@escook/express-joi");

// 导入userinfo的路由处理模块
const userinfoHandler = require("../router_handle/userinfo");
