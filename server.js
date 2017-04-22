// Main Server App

var express = require('express');
var app = express();

exports.app = app;

app.get('/', function (req, res){
	res.send('index')
});

app.get('/summary', function (req, res){
	res.send('summary')
});

app.get('/end', function (req, res){
	res.send('end')
});


app.get('/new-card', function (req, res){
	res.send('new-card')
});

app.get('/sign-up', function (req, res){
	res.send('sign-up')
});

app.get('/start', function (req, res){
	res.send('start')
});


app.use(express.static('public'));
app.listen(process.env.PORT || 8080);