/*Packages*/

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var config = require('./config');

/*Creating an instance of express for creating server*/
var app = express();

/*Connection for the database*/
mongoose.connect(config.database, function(err){
	if (err){
		console.log(err);
	}
	else{
		console.log("Connected to the database");
	}
});

app.set('superSecret', config.secretKey); // secret variable

/*Middlewares*/
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

// To render all public static (css and javascript) files, we have to create the following middleware
app.use(express.static(__dirname + '/public'));

var api = require('./app/routes/api')(app, express);
app.use('/api', api);

/*Routing*/
app.get('*', function(req, res){
	res.sendFile(__dirname + '/public/app/views/index.html');
});

app.listen(config.port, function(err){
	if (err){
		console.log(err);
	}
	else{
		console.log("Listening on port 3000");
	}
})