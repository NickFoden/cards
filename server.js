var express = require('express');
var app = express();
var router = express.Router();
app.use(express.static('public'));

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

var path = require('path');

exports.app = app;

exports.DATABASE_URL = process.env.DATABASE_URL ||
						global.DATABASE_URL ||
						'mongodb://localhost/cards-db';

app.listen(process.env.PORT || 8080);

/*app.get('/', function (req, res){
	res.sendFile(path.join(__dirnname + '/public/index.html'));
});

app.get('/summary', function (req, res){
	res.sendFile(path.join(__dirname + '/public/summary.html'));
});

app.get('/end-of-cards', function (req, res){
	res.sendFile(path.join(__dirname + '/public/end-of-cards.html'));
});

app.get('/new-card', function (req, res){
	res.sendFile(path.join(__dirname + '/public/new-card.html'));
});

app.get('/sign-up', function (req, res){
	res.sendFile(path.join(__dirname + '/public/sign-up.html'));
});

app.get('/start', function (req, res){
	res.sendFile(path.join(__dirname + '/public/start.html'));
});*/


//END