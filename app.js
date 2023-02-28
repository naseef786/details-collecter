var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');


var app = express();


var indexRouter = require('./routes/index');


// app.use(express-session)
app.use(session({
    secret:"my secret key",
    saveUninitialized:true,
    resave:false
 }))

//  const host = req.host;
// const filePath = req.protocol + "://" + host + '/' + req.file.path;







mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/week8brid",{useNewUrlParser: true , useUnifiedTopology:true});
var db = mongoose.connection;
db.on("error", function(error){ console.log(error);});
db.once('open',()=>{console.log("connected to database"); });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('uploads'))
// app.use(express.static(path.join(__dirname, 'uploads')));
app.use("", indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// app.use((error, req, res, next) => {
//   console.log('This is the rejected field ->', error.field);
// });

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
