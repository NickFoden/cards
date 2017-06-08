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
const Strategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const Users = require('./userdb.js')

router.use(jsonParser);

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());
router.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
router.use(passport.initialize());
router.use(passport.session());



router.post('/', (req, res) => {
  console.log(req.body);
  if (!req.body) {
    return res.status(400).json({message: 'No request body'});
  }

  if (!('username' in req.body)) {
    return res.status(422).json({message: 'Missing field: email'});
  }

  let {username, password} = req.body;
  console.log(username, password)

  if (typeof username !== 'string') {
    return res.status(422).json({message: 'Incorrect field type: email'});
  }

  username = username.trim();

  if (username === '') {
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
    .find({username})
    .count()
    .exec()
    .then(count => {
      if (count > 0) {
        return Promise.reject({
          name: 'AuthenticationError',
          message: 'Email already taken'
        });
      }
      return User.hashPassword(password)
    })
    .then(hash => {
      return User
        .create({
          username: email,
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

passport.use(new Strategy(
  function(username, password, cb) {
    Users.findByUsername({username: 'email'}, {}, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
}));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  Users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

router.get('/login',
  function(req, res){
    res.redirect(200, '/new-card.html');
  });

router.post('/login', passport.authenticate('local'), function(req, res) { 
   res.redirect('/summary.html')
  });

router.get('/logout',
  function(req, res){
    req.logout();
    res.redirect('/');
  });

module.exports = {router};

//End