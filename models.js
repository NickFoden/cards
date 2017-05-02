const mongoose = require('mongoose');

const cardSchema = mongoose.Schema({
		//"id":"",
         "question": {type: String, required: true},
         "answer": {type: String, required: true},
         "example": {type: String, required: true},
         "reference": {type: String, required: true}
});

const Card = mongoose.model('Card', cardSchema);

module.exports = {Card};