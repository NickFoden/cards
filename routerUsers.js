const {BasicStrategy} = require('passport-http');
const express = require('express');
const jsonParser = require('body-parser').json();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const {PORT, DATABASE_URL} = require('./config.js');

const {User} = require('./models');

const router = express.Router();

const routerUsers = router;

module.exports = {router: routerUsers};

