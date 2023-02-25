const bcrypt = require('bcrypt');
const User = require('../models/User');
const Tweet = require('../models/Tweet');

const saltRounds = 10;

const login = (req, res) => {
  const { userName, password } = req.params;

  User.findOne({ name: userName }, (err, user) => {
    if (user != null) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result === true) {
          res.json({ message: 'Login successful!' });
        } else {
          res.status(400).send({
            message: 'Wrong password!',
          });
        }
      });
    } else {
      res.status(400).send({
        message: 'Username unavailable',
      });
    }
  });
};

const register = (req, res) => {
  // check for duplication
  User.findOne({ name: req.body.name }, (err, data) => {
    if (data != undefined && 'name' in data) {
      if (data.name == req.body.name) {
        res.status(400).json({
          message: 'This username is already picked!',
          status: 400,
        });
      }
    } else {
      // if the name hasn't been picked up, create the user collections and tweets collections
      bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        const newAccount = new User({
          profilePhoto: req.body.profilePhoto || '--default.jpg',
          name: req.body.name,
          password: hash,
          description:
            req.description || `Hi! I am ${req.body.name}! I am using Dweet!`,
          targetedCloseFriends: [],
        });

        newAccount.save().then(() => {
          User.findOne({ name: req.body.name }, '_id', (err, data) => {
            const newUserTweet = new Tweet({
              _id: data._id,
              tweets: [],
            });

            newUserTweet.save().then(() => {
              res.json({ message: 'OK', status: 200 });
            });
          });
        });
      });
    }
  });
};

module.exports = { login, register };
