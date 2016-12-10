// Dependencies
// ============
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser'); // for working with cookies
var bodyParser = require('body-parser');
var session = require('express-session'); 
var methodOverride = require('method-override');
var nodemailer = require("nodemailer");// for deletes in express


// Our model controllers (rather than routes)
var application_controller = require('./controllers/application_controller');

var users_controller = require('./controllers/users_controller');

var Fave = require("./models")["Fave"];
Fave.sync();

var User = require("./models")["User"];
User.sync();

var Note = require("./models")["Note"];
Note.sync();
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


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', application_controller);
app.use('/users', users_controller);

app.post('/sendMail', function (req, res, next) {
    var sg = require('sendgrid')('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');
    var request = sg.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: {
            personalizations: [
                {
                    to: [
                        {
                            email: 'kaelymills@gmail.com',
                        },
                    ],
                    subject: 'You have been contacted about your lost Paw!',
                },
            ],
            from: {
                email: req.body.email,
            },
            content: [
                {
                    type: 'text/plain',
                    value: req.body.message,
                },
            ],
        },
    });
    console.log("Your message sentt");

//With promise
    sg.API(request)
        .then(response => {
        console.log(response.statusCode);
    console.log(response.body);
    console.log(response.headers);
})
    .catch(error => {
        //error is an instance of SendGridError
        //The full response is attached to error.response
        console.log(error.response.statusCode);
});

//With callback
    sg.API(request, function(error, response) {
        if (error) {
            console.log('Error response received');
        }
        console.log(response.statusCode);
        console.log(response.body);
        console.log(response.headers);
    });

    console.log(req);
    res.end();

})


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});



var PORT = process.env.PORT || 3000;
console.log("listening" + PORT);

app.get('/',function(req,res){
    res.sendfile('index.html');
});

app.listen(PORT);