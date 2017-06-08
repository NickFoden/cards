var express = require('express');
var router = express.Router();
const Users = router;

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;