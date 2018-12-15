/**
 * Created by brady on 2018/12/15.
 */
const express = require('express');
const mysql  = require('mysql');
const config = require('../libs/config.js');

//链接数据库
const db = mysql.createPool(config);

module.exports = function() {
  //创建路由
  let router = express.Router();
  //GET请求
  router.get('/', (req, res) => {
    console.log('请求url：', req.path);
    console.log('请求参数：', req.query);
    // res.send('这是get请求');
    res.render('index', {title: 'Admin'});
  })
  //POST请求
  router.post('/', (req, res) => {
    console.log('请求参数：', req.body);
    let result = {code: 200, msg: 'post请求成功'};
    res.send(result);
  });
  //用户表
  router.use('/user', require('./user.js')());

  return router;
};