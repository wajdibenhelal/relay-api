var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var storesRouter = require('./routes/stores');
var productsRouter = require('./routes/products');
var clientsRouter = require('./routes/clients');
var orderRouter = require('./routes/order');
var productReview = require('./routes/reviews');


/* Dummy Data */
var dummyData = require('./utils/data');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/stores', storesRouter);
app.use('/products', productsRouter);
app.use('/clients', clientsRouter);
app.use('/orders',orderRouter );
app.use('/product_reviews', productReview);
app.use('/data', dummyData);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'production' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


//localhost:3003
app.listen(3003, () => {
    console.log("Server is up and listening on 3003...")
})

module.exports = app;

