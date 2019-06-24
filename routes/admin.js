/**
 * Created by brady on 2019/3/9.
 */
const express = require('express');
const mysql = require('mysql');
const config = require('../libs/config');

const db = mysql.createPool(config);

module.exports = () => {
  let router = express.Router();

  //首页
  router.get('/', (req, res) => {
    res.render('index', { title: '首页' });
  });


  //用户表
  router.get('/user', (req, res) => {
    db.query(`select * from user`, (err, data) => {
      console.log(err)
      console.log(data)
      if (err) {
        res.state(500).send('database error').end();
      } else {
        res.render('user', { title: '用户表', data: data });
      }
    })
  });

  //添加用户
  router.get('/addUser', (req, res) => {
    res.render('addUser', { title: '添加用户' });
  });

  //修改用户
  router.get('/editUser/:id', (req, res) => {
    let id = req.params.id;
    db.query(`select * from user where id = ${id}`, (err, data) => {
      if (err) {
        res.state(500).send('database error').end();
      } else {
        res.render('editUser', { title: '修改用户', data: data});
        console.log(data);
      }
    });
  });

  return router;
}
