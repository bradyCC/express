/**
 * Created by brady on 2018/12/15.
 */
const express = require('express');
const mysql = require('mysql');
const config = require('../libs/config.js');

//链接数据库
const db = mysql.createPool(config);

module.exports = function() {
  //创建路由
  let router = express.Router();
  //访问user
  router.get('/',(req,res) => {
    var id = req.query.id;
    switch(req.query.act) {
      case 'del':
        //删除
        db.query(`delete from user where id = ${id}`,(err,data) => {
          if(err) {
            console.log(err);
            res.status(500).send('database error').end();
          }else {
            res.redirect('/user');
          }
        });
        break;
      default:
        //渲染数据
        db.query(`select * from user`,(err,users) => {
          if(err) {
            console.log(err);
            res.status(500).send('database error').end();
          }else {
            res.render('user',{title: '用户表', users});
          }
        });
        break;
    }
  });
  return router;
};
