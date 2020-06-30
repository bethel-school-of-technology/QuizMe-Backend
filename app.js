var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
var cors = require('cors');
var logger = require('morgan');
var models = require('./models');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var highscoresRouter = require('./routes/highscores');


var app = express();
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});
app.use(bodyParser.json());
app.use(cors({origin: "http://localhost:3000"}));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/highscores', highscoresRouter);

models.sequelize.sync().then(() => console.log("DB Synced Up"))
    .catch(() => console.log("DB Failed to sync"));
    
module.exports = app;
