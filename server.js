var express = require('express');
var app = express();
app.use(express.static('public'));

exports.app = app;

app.get('/', function (req, res){
	res.sendFile(path.join('/index.html'));
});

app.get('/summary', function (req, res){
	res.sendFile(path.join(__dirname +'/summary.html'));
});

app.get('/end', function (req, res){
	res.renderHtml(path.join(__dirname + '/end.html'));
});

app.get('/new-card', function (req, res){
	res.sendFile(path.join(__dirname + '/new-card.html'));
});

app.get('/sign-up', function (req, res){
	res.sendFile(path.join(__dirname + '/sign-up.html'));
});

app.get('/start', function (req, res){
	res.sendFile(path.join(__dirname + '/start.html'));
});



app.listen(process.env.PORT || 8080);