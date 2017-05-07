const express = require('express');
const {PORT, DATABASE_URL} = require('./config.js');
const mongoose = require('mongoose');
const {Card} = require('./models.js');
const bodyParser = require('body-parser');

const app = express();
const router = express.Router();

app.use(express.static('public'));
app.use(bodyParser.json());
mongoose.Promise = global.Promise;

mongoose.connect('DATABASE_URL');

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
	console.log(req);
	console.log(res);
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
      card => res.status(201).json(card))    
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});

app.delete('/cards/:id', (req, res) => {
  Card
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(card => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

let server;

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

function stopServer() {
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

if (require.main === module) {
  runServer().catch(err => console.error(err));
};
module.exports = {app, runServer, stopServer};
