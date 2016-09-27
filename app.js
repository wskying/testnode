process.env.NODE_ENV = "development";

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var testsql = require('./routes/sql');
var testsoap = require('./routes/tsoap');
var test = require('./routes/test');

var uploadFile = require('./routes/upload');
var chart = require('./routes/chart');


var app = express();

// app.configure(function(){
//
//     app.use(express.methodOverride());
//     app.use(app.router);
//     app.use(express.static(__dirname + '/public'));
// });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(bodyParser({uploadDir:'c:\\aa'}));

app.use('/', routes);
app.use('/users', users);
app.use('/sql', testsql);
app.use('/soap', testsoap);
app.use('/test', test);
app.use('/upload', uploadFile);
app.use('/chart', chart);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
console.log(app.get('env'));

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// process.on('uncaughtException', function (err) {
//     console.log('Caught exception: ' + err);
// });

module.exports = app;
