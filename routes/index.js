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

  /**
   * HTTP请求方式：GET和POST
   * GET：
   * 1. req.query 处理GET请求, 获取GET请求参数
   * 2. req.params
   * POST：
   * 1. req.body
   * 2. req.params
   * */
  // 获取用户表
  router.post('/api/getUser', (req, res) => {
    db.query(`select * from user`, (err, data) => {
      if (err) {
        res.state(500).send('database error').end();
      } else {
        res.json({
          code: 0,
          msg: '查询成功',
          token: '',
          data: data
        });
        // res.send(data).end();
      }
    })
  });
  // 获取用户表中的某个用户
  router.post('/api/getUser/:id', (req, res) => {
    let id = req.params.id;
    db.query(`select * from user where id = ${id}`, (err, data) => {
      if (err) {
        res.state(500).send('database error').end();
      } else {
        res.json({
          code: 0,
          msg: '查询成功',
          token: '',
          data: data
        });
        // res.send(data).end();
      }
    })
  })
  return router;
};