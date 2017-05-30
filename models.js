const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {PORT, DATABASE_URL} = require('./config.js');
mongoose.Promise = global.Promise;

const cardSchema = mongoose.Schema({
         "question": {type: String, required: true},
         "answer": {type: String, required: true},
         "reference": {type: String, required: true},
         "difficulty": {}
     }, {
          "versionKey": false 
     }
);

const userSchema = mongoose.Schema({
         "email": {type: String, required: true, unique: true},
         "password": {type: String, required: true}
     } 
);

const Card = mongoose.model('Card', cardSchema);
const User = mongoose.model('User', userSchema);

module.exports = {Card, User};