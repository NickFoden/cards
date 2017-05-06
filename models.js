const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
         "question": {type: String, required: true},
         "answer": {type: String, required: true},
         "reference": {type: String, required: true}
     }, {
          "versionKey": false 
     }
);

const Card = mongoose.model('Card', cardSchema);

module.exports = {Card};