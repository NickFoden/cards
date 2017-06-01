const {BasicStrategy} = require('passport-http');
const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonParser = require('body-parser').json();
const bcrypt = require('bcryptjs');
const passport = require('passport');
mongoose.Promise = global.Promise;
const {User} = require('./models.js');
const {PORT, DATABASE_URL} = require('./config.js');
const LocalStrategy = require('passport-local').Strategy;

const routerUsers = router;

router.use(jsonParser);

const strategy = new BasicStrategy (
  (email, password, cb) => {
    User
      .findOne({email})
      .exec()
      .then(user => {
        if (!user) {
          return cb(null, false, {
            message: 'Incorrect username'
          });
        }
        if (user.password !== password) {
          return cb(null, false, 'Incorrect password');
        }
        return cb(null, user);
      })
      .catch(err => cb(err))
});

passport.use(strategy);

router.post('/', (req, res) => {
  console.log(req.body);
  if (!req.body) {
    return res.status(400).json({message: 'No request body'});
  }

  if (!('email' in req.body)) {
    return res.status(422).json({message: 'Missing field: email'});
  }

  let {email, password} = req.body;

  if (typeof email !== 'string') {
    return res.status(422).json({message: 'Incorrect field type: email'});
  }

  email = email.trim();

  if (email=== '') {
    return res.status(422).json({message: 'Incorrect field length: email'});
  }

  if (!(password)) {
    return res.status(422).json({message: 'Missing field: password'});
  }

  if (typeof password !== 'string') {
    return res.status(422).json({message: 'Incorrect field type: password'});
  }

  password = password.trim();

  if (password === '') {
    return res.status(422).json({message: 'Incorrect field length: password'});
  }

  return User
    .find({email})
    .count()
    .exec()
    .then(count => {
      if (count > 0) {
        return Promise.reject({
          name: 'AuthenticationError',
          message: 'Email already taken'
        });
      }
      // if no existing user, hash password
      return User.hashPassword(password)
    })
    .then(hash => {
      return User
        .create({
          email: email,
          password: hash
        })
    })
    .then(user => {
      console.log(user);
      return res.status(201).json(user.apiRepr());
    })
    .catch(err => {
      console.log(err);
      if (err.name === 'AuthenticationError') {
        return res.status(422).json({message: err.message});
      }
      res.status(500).json({message: 'Internal server BIG error'})
    });
});

router.post('users/login',
  passport.authenticate('local', {successRedirect: '/', failureRediect: 'login.html'}),
  function(req, res) {
    res.redirect('/');
  });

module.exports = {router};

//End