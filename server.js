var express = require('express');
var app = express();
var router = express.Router();
app.use(express.static('public'));

var path = require('path');

exports.app = app;

app.get('/', function (req, res){
	res.sendFile(path.join(__dirnname + '/public/index.html'));
});

app.get('/summary', function (req, res){
	res.sendFile(path.join(__dirname + '/public/summary.html'));
});

app.get('/end', function (req, res){
	res.renderHtml(path.join(__dirname + '/public/end.html'));
});

app.get('/new-card', function (req, res){
	res.sendFile(path.join(__dirname + '/public/new-card.html'));
});

app.get('/sign-up', function (req, res){
	res.sendFile(path.join(__dirname + '/public/sign-up.html'));
});

app.get('/start', function (req, res){
	res.sendFile(path.join(__dirname + '/public/start.html'));
});


app.listen(process.env.PORT || 8080);