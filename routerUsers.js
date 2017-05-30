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

const routerUsers = router;

router.use(jsonParser);

router.post('/', (req, res) => {
  console.log(req);
  console.log(res);
  const requiredFields = ['user-email', 'password' ];
  for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`;
      console.error(message);
      return res.status(400).send(message);
    }
  }
  User
    .create({
      email: req.body.email,
      password: req.body.password})
    .then(
      User => res.status(201).json(User))    
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
    console.log(User);
});


module.exports = {User};
module.exports = {router};
//End
