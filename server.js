// Main Server App

var express = require('express');
var app = express();
var end = require('/public/end')

app.use(express.static('public'));
app.listen(process.env.PORT || 8080);

exports.app = app;

app.get('/end', function (req, res){
	res.send('end')
});