const mongoose = require('mongoose');
const {PORT, DATABASE_URL} = require('./config.js');

const cardSchema = mongoose.Schema({
         "question": {type: String, required: true},
         "answer": {type: String, required: true},
         "reference": {type: String, required: true},
         "difficulty": {}
     }, {
          "versionKey": false 
     }
);

const Card = mongoose.model('Card', cardSchema);

module.exports = {Card};