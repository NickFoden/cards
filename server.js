// Main Server App

var express = require('express');
var app = express();

app.use(express.static('public'));
app.listen(process.env.PORT || 8080);

exports.app = app;

app.get('/end', function (req, res){
	res.render('/end')
});