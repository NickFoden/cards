var express = require('express');
var app = express();
var router = express.Router();
app.use(express.static('public'));

var path = require('path');

exports.app = app;

app.listen(process.env.PORT || 8080);