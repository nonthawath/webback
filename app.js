var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cookieSession = require('cookie-session')
var cors = require('cors')
const getuser = require('./routes/getuser')
const borrow = require('./routes/inventory')
const q = require('./routes/queue')
var app = express();
require('./service/logingoogle')
app.use(cors())
require('dotenv').config()
require('./service/conectDB')
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession({
  name: 'inventory-session',
  keys: ['key1', 'key2']
}))
app.use(passport.initialize());
app.use(passport.session());
app.use('/q', q)
app.use('/home', indexRouter);
app.use('/users', usersRouter);
app.use('/inventory' , borrow)
app.use('/getuser' , getuser)
// app.use( '', )
app.get('/login/google' , passport.authenticate('google', { scope: ['profile' , 'email'] }))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
