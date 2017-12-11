var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');  //打印日志
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var consolidate = require("consolidate");

//首页-->导航+foot
var headfoot = require('./routes/headfoot');
var index = require("./routes/index");
var pList = require("./routes/pList");
var detail = require("./routes/detail");
var shopcart = require("./routes/shopcart");
var register = require("./routes/register");
var login = require("./routes/login");

var app = express();  //搭建express的web服务

// view engine setup渲染引擎设置
//app.set("view engine","html")//设置引擎默认输出格式
app.set('views', path.join(__dirname, 'views'));  //搭建磁盘路径,模板引擎目录
app.set('view engine', 'ejs');       //设置输出引擎与模板类型
app.engine("html",consolidate.ejs);  //

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));  //禁图标信息
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  //静态页面托管

//响应
app.use('/',index);
app.use('/head', headfoot);
app.use("/foot",headfoot);
app.use("/pList",pList);
app.use("/proDetail",detail);
app.use("/shopcart",shopcart);
app.use("/register",register());
app.use("/login",login());

// 处理错误的接口请求
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
