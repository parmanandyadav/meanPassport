var express    	  = require('express');
var app     	  = express();
var port    	  = '9000';
var session 	  = require('express-session');
var bodyparser 	  = require('body-parser');
var passport 	  = require('passport');
var bCrypt 		  = require('bcrypt-nodejs');
var mongoose 	  = require('mongoose');
var morgan        = require('morgan');
var passportLocal = require('passport-local');
var flash    	  = require('connect-flash');
var cookieParser  = require('cookie-parser');

//Connecting to the mongo database
mongoose.connect('mongodb://localhost:27017/mean-app');

require(__dirname +'/server/Controller/passport')(passport);

//Routing the resources
app.use('/views', express.static(__dirname + '/client/views'));
app.use('/js', express.static(__dirname + '/client/Controllers'));
app.use('/css', express.static(__dirname + '/client/Stylesheets'));

app.use(morgan('combined'));
app.use(cookieParser());
app.use(bodyparser());

// required for passport
app.use(session({ 
	secret: 'thebetrayer' // session secret
}));

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

require('./client/Controllers/routes.js')(app,passport)

app.set("rootPath", __dirname);

app.listen(port, function(){
	console.log('The Server is Running on port:', port);
})