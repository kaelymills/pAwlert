var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override')

var app = express();
//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}))
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

var routes = require('./controllers/usercontroller.js');

app.use('/public/landing.html')
app.use('/', routes);
app.use('/find', routes);
app.use('/create', routes);

var PORT = process.env.PORT || 3000;
app.listen(PORT);

console.log("app is running on port " + PORT);