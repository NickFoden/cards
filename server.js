var express = require('express');
var app = express();
app.use(express.static('public'));

exports.app = app;

app.get('/', function (req, res){
	res.sendFile('/index.html')
});

app.get('/summary', function (req, res){
	res.sendFile('summary')
});

app.get('/end', function (req, res){
	res.sendFile('end')
});

app.get('/new-card', function (req, res){
	res.sendFile('new-card')
});

app.get('/sign-up', function (req, res){
	res.sendFile('sign-up')
});

app.get('/start', function (req, res){
	res.sendFile('start')
});



app.listen(process.env.PORT || 8080);