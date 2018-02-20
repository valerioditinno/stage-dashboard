var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var sensors = require('./routes/sensors');

var socketCtrl = require('./controller/socketCtrl');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// set admin_path
app.set('admin_path',path.join(__dirname,'views','admin'+path.sep));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt');
var config = require('./config');

app.use(
  expressJWT({
    secret: config.key,
    getToken: function fromHeaderOrQueryString (req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
            return req.headers.authorization.split(' ')[1];
        else if (req.query && req.query.token)
            return req.query.token;
    }
  }).unless({ path: ['/sensors/alarm', '/login', '/login/auth', '/'] }));

app.use('/', index);
app.use('/login', login);
app.use('/users', users);
app.use('/sensors', sensors);

// catch 404 and forward to error handler
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
  res.sendFile(path.join(__dirname, 'views', '404.html'));
});

module.exports = app;
