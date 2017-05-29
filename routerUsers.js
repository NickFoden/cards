const {BasicStrategy} = require('passport-http');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonParser = require('body-parser').json();
const jsonParser = require('body-parser').json();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const {PORT, DATABASE_URL} = require('./config.js');
mongoose.Promise = global.Promise;
const {User} = require('./models');

const router = express.Router();

const routerUsers = router;

const {PORT, DATABASE_URL} = require('./config.js');

router.get('/users', (req, res) => {
  User
    .find()
    .exec()
    .then(cards => {
      res.status(200).json(routerUsers);
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});


router.post('/users',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login'})
);

module.exports = {router: routerUsers};

