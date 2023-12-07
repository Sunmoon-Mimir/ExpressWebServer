//导入了一些第三方模块
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
const session = require('express-session');
const RedisStore = require("connect-redis").default;
const redisClient = require('./db/redis');

require('./db/sync');//建表

//导入了处理路由的模块
var usersRouter = require('./routes/user');

//创建了服务端实例对象
var app = express();

//处理动态网页
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/*express中通过morgan记录日志
只需要安装并导入模块，注册Morgan中间件即可
在注册中间件的时候需要指定日志的模式，不同的模式记录的内容也不同
默认情况下Morgan会将日志输出到控制台中，也可以通过配置写入日志文件里
*/
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'log/access.log'), { flags: 'a' })
app.use(logger('combined',
  { stream: accessLogStream }));
//处理post请求参数
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//解析cookie
app.use(cookieParser());
/*
只要使用了express-session插件，它就会添加一个内容req.session
*/


// app.use(session({
//   name: 'userId',
//   store: new RedisStore({
//     client: redisClient,
//     prefix: "myapp:",
//   }),
//   secret: 'xmycat',//生成无关紧要的userID的密钥
//   resave: false,
//   saveUninitialized: true,
//   cookie: { path: '/', httpOnly: true, maxAge: 1000 * 60 * 60 * 24 }
// }))


//处理静态网页
app.use(express.static(path.join(__dirname, 'public')));

//注册处理路由的模块
app.use('/api/user', usersRouter);

//处理错误
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
