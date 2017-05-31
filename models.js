const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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

userSchema.methods.apiRepr = function() {
  return {
    email: this.email || ''
  };
}

userSchema.methods.validatePassword = function(password) {
  return bcrypt
    .compare(password, this.password)
    .then(isValid => isValid);
}

userSchema.statics.hashPassword = function(password) {
  return bcrypt
    .hash(password, 10)
    .then(hash => hash);
}

const Card = mongoose.model('Card', cardSchema);
const User = mongoose.model('User', userSchema);

module.exports = {Card, User};