const express = require('express');  //引入express模块
const path = require('path'); //引入path模块, 该模块包括了一些处理文件路径的功能
const cookieParser = require('cookie-parser'); //cookie操作中间件, 一个解析Cookie的工具, 通过req.cookies可以取到传过来的cookie, 并把它们转成对象
const cookieSession = require('cookie-session'); //session操作中间件, 一个解析Session的工具, 通过req.session可以取到传过来的session, 并把它们转成对象
const bodyParser = require('body-parser'); //node.js 中间件, 用于处理 JSON, Raw, Text 和 URL 编码的数据
const multer = require('multer'); //node.js 中间件, 用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据. (eg: 多图片/多文件路径时)
const consolidate = require('consolidate');
const mysql  = require('mysql');
const moment = require('moment');
const ejs = require('ejs'); //视图引擎
const favicon = require('serve-favicon'); //图标缓存服务中间件
const createError = require('http-errors');
const logger = require('morgan'); // TTP请求日志中间件

//自定义路由模块的引用
const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

const app = express(); //创建一个Express应用
/**
 * 跨域处理
 * */
app.all('*', function(req, res, next) {
  // 跨域处理
  res.header("Access-Control-Allow-Origin", "*"); //允许任何源
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With"); //允许任何类型
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");  //允许任何方法
  res.header("X-Powered-By",' 3.2.1')
  if(req.method === "OPTIONS") res.send(200); //让options请求快速返回
  else  next();
});

// 视图引擎设置
app.set('views', path.join(__dirname, 'views')); //设置views的目录, __dirname全局变量表示当前执行脚本所在的目录
app.set('view engine', 'ejs'); // 设置渲染引擎

//使用HTML模板引擎
// app.set('views', path.join(__dirname, 'views'));
// app.engine('html', ejs.__express);
// app.set('view engine', 'html');

app.use(logger('dev')); //日志设置，使用参见https://github.com/expressjs/morgan
app.use(express.json()); //解析JSON格式的post参数
// app.use(favicon(__dirname + '/public/favicon.ico'));
// app.use(express.urlencoded({ extended: false }));

/**
 * 获取请求数据
 * GET数据: req.query
 * POST数据: req.body
 * POST文件: req.files
 * 未签名cookie: req.cookies
 * 签名cookie: req.signedCookies
 * session: req.session
 * */
app.use(bodyParser.urlencoded({ //接收POST数据
  extended: false,            //扩展模式
  limit: 2*1024*1024          //限制POST数据大小 2M
}));
app.use(multer({dest:'./public/upload'}).any());  //接收POST文件
app.use(cookieParser());
(function(){
  var arr = [];
  for(var i=0; i<10000; i++) {
    arr.push('keys_' + Math.random());
  }
  app.use(cookieSession({
    name: 'session_id',         //设置SESSION_ID
    keys: arr,                  //设置keys数组,用于加密
    maxAge: 20*3600*1000        //有效期
  }));
})();
app.use(express.static(path.join(__dirname, 'public'))); //静态目录设置

//路由
app.use('/', indexRouter());
app.use('/', adminRouter());


//捕捉404错误并进行错误处理
app.use(function(req, res, next) {
  next(createError(404));
});

//错误处理
app.use(function(err, req, res, next) {
  //设置局部变量，只在开发中提供错误
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //呈现错误页面
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
