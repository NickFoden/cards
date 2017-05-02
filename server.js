const express = require('express');
const {PORT, DATABASE_URL} = require('./config.js');
const mongoose = require('mongoose');

const app = express();
const router = express.Router();

app.use(express.static('public'));
mongoose.Promise = global.Promise;


app.get('/cards', (req, res) => {
  Card
    .find()
    .exec()
    .then(cards => {
      res.status(200).json(cards);
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

app.post('/cards', (req, res) => {
	const requiredFields = ['question', 'answer', 'reference'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i];
		if (!(field in req.body)) {
			const message = `Missing \`${field}\` in request body`;
			console.error(message);
			return res.status(400).send(message);
    }
  }
	Card
    .create({
      question: req.body.question,
      answer: req.body.answer,
      reference: req.body.reference})
    .then(
      card => res.status(201))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

function runServer(databaseUrl=DATABASE_URL, port=PORT){

	return new Promise((resolve, reject) => {
    	mongoose.connect(databaseUrl, err => {
			if (err) {
				return reject(err);
			}
			server = app.listen(port, () => {
				console.log(`Your app is listening on port ${port}`);
				resolve();
	      	})
	      	.on('error', err => {
	        	mongoose.disconnect();
	        	reject(err);
      		});
    	});
  	});
}

function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

module.exports = {app, runServer, stopServer},
