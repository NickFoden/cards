const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const {Card, Users} = require('./models.js');
const {router: routerCards} = require('./routerCards');
const {router: routerUsers} = require('./routerUsers');
mongoose.Promise = global.Promise;
const {PORT, DATABASE_URL} = require('./config.js');
const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.use('/cards/', routerCards);
app.use('/users/', routerUsers);

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
