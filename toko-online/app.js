var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//panggil file koneksi database
require('./app_toko_online/models/db'); 

var indexRouter = require('./app_toko_online/routes/index');// perbaikan 2
var usersRouter = require('./app_toko_online/routes/users');
var apiProductRouter = require('./app_toko_online/routes/api/product'); //import route api
var apiUserRouter = require('./app_toko_online/routes/api/user'); //import route api
var apiOrderRouter = require('./app_toko_online/routes/api/order'); //import route api
var engine = require('ejs-blocks'); // menggunakan ejs block
var app = express();
var productRouter = require('./app_toko_online/routes/product');//tambahkan router dari product.js
var reviewRouter = require('./app_toko_online/routes/review');//tambahkan router dari review.js


// view engine setup
app.set('views', path.join(__dirname, 'app_toko_online', 'views'));//perbaikan 1
app.engine('ejs',engine); //daftarkan engine ejs-block
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Serving bootstrap
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
// path join ini adalah path yang akan menggabungkan (joinkan) folder ke folder public
// __dirname adalah folder project kita
// 'node_modules/bootstrap/dist' adalah file yang akan kita akses
// ada cara agar server tetap hidup walaupun sering ada perubahan yaitu dengan cara 'npm install nodemon'
// nodemon adalah dependensi yang akan otomatis refresh server kita ketika terjadi perubahan
// cara pakai nodemon adalah nodemon /bin/www
// cara hapus dependensi adalah npm remove {nama dependensinya}
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/product', productRouter); //gunakan router product
// untuk route yang kita daftarkan tadi
app.use('/api/products', apiProductRouter); //route untuk API produk
app.use('/api/users', apiUserRouter); //route untuk API user
app.use('/api/orders', apiOrderRouter); //route untuk API order
app.use('/product/:id/review', reviewRouter); //route untuk API produk
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
