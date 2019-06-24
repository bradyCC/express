const express = require('express');
const mysql = require('mysql');
const config = require('../libs/config');

const db = mysql.createPool(config);

module.exports = function() {
  let router = express.Router();

  //查询用户
  router.get('/api/getUser', (req, res) => {
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
      }
    });
  });

  //添加用户
  router.post('/api/addUser', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let phone = req.body.phone;
    let email = req.body.email;

    db.query(`insert into user(username, password, phone, email) values('${username}', '${password}', '${phone}', '${email}')`, (err, data) => {
      if (err) {
        res.send('添加失败');
      } else {
        res.json({
          code: 0,
          msg: '添加成功',
          token: ''
        })
      }
    });
  });

  //删除用户
  router.get('/api/delUser/:id', (req, res) => {
    let id = req.params.id;
    db.query(`delete from user where id = '${id}'`, (err, data) => {
      if (err) {
        res.send('删除失败');
      } else {
        res.redirect('/user');
      }
    });
  });

  //修改用户
  router.post('/api/editUser', (req, res) => {
    let id = req.body.id;
    let username = req.body.username;
    let password = req.body.password;
    let phone = req.body.phone;
    let email = req.body.email;

    db.query(`update user set username = '${username}', password = '${password}', phone = '${phone}', email = '${email}' where id = '${id}'`, (err, data) => {
      if (err) {
        res.send('修改失败');
      } else {
        res.json({
          code: 0,
          msg: '修改成功',
          token: ''
        })
      }
    });
  });

  return router;
}
