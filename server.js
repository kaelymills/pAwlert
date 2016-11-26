var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // for working with cookies
var bodyParser = require('body-parser');
var session = require('express-session'); 
var methodOverride = require('method-override'); // for deletes in express


// Our model controllers (rather than routes)
var users_controller = require('./controllers/usercontroller');

// var User = require("./models")["user"];
// User.sync();

// Express settings
// ================

// instantiate our app
var app = express();

// override POST to have DELETE and PUT
app.use(methodOverride('_method'));

//allow sessions
app.use(session({ secret: 'app', cookie: { maxAge: 1000 * 1000 }, resave: true, saveUninitialized: true}));
app.use(cookieParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));

//set up handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', users_controller);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


var PORT = process.env.PORT || 3000;
console.log("Listening" + PORT);

app.listen(PORT);


