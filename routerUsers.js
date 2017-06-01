const {BasicStrategy} = require('passport-http');
const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonParser = require('body-parser').json();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const expressSession = require('express-session');
mongoose.Promise = global.Promise;
const {User} = require('./models.js');
const {PORT, DATABASE_URL} = require('./config.js');

const routerUsers = router;

router.use(jsonParser);
router.use(expressSession({secret: 'mySecretKey'}));
router.use(passport.initialize());
router.use(passport.session());

const strategy = new BasicStrategy(
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

router.get('/', (req, res) => {
  return User
    .find()
    .exec()
    .then(users => res.json(users.map(user => user.apiRepr())))
    .catch(err => console.log(err) && res.status(500).json({message: 'Internal server error'}));
});

const basicStrategy = new BasicStrategy(function(email, password, callback) {
  let user;
  User
    .findOne({email: email})
    .exec()
    .then(_user => {
      user = _user;
      if (!user) {
        return callback(null, false, {message: 'Incorrect email'});
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return callback(null, false, {message: 'Incorrect password'});
      }
      else {
        return callback(null, user)
      }
    });
});

passport.use(basicStrategy);
router.use(passport.initialize());

module.exports = {router};

//End