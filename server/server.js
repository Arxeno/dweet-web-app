const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const CONFIG = require('./config.js');
const fs = require('fs');

// FUNCTIONS
const shuffleArray = (arr) => {
  for (const element of arr) {
    // arr[index] = element
    const index = arr.indexOf(element);
    const randomIndex = Math.floor(Math.random() * arr.length);

    const temp = element;
    arr[index] = arr[randomIndex];
    arr[randomIndex] = temp;
  }

  return arr;
};

// EXPRESS START
const PORT = process.env.PORT || 6001;
const app = express();

app.use(bodyParser.json());
app.use(cors());
// app.use((req, res, next) => {
// 	res.setHeader('Access-Control-Allow-Origin', '*')
// 	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
// 	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
// 	next()
// })

// MONGODB
// STARTING MONGODB
mongoose.set('strictQuery', false);

const options = { useNewUrlParser: true };

mongoose
  .connect(`${CONFIG.MONGODB_URL}/${CONFIG.MONGODB_DATABASE}`, options)
  .then(() => {
    console.log('Connected to MongoDB.');
    // Back end listen
    app.listen(PORT, () => console.log(`Server port: ${PORT}`));
  })
  .catch((err) => console.log(err));

// MONGODB COLLECTIONS
// collection: users
const userSchema = new mongoose.Schema({
  profilePhoto: String,
  name: String,
  password: String,
});

const User = mongoose.model('users', userSchema);

// collection: tweets
const oneTweetSchema = new mongoose.Schema({
  date: String,
  tweet: String,
});

const tweetsSchema = new mongoose.Schema({
  _id: mongoose.ObjectId,
  tweets: [oneTweetSchema],
});

const Tweet = mongoose.model('tweets', tweetsSchema);

// Users.collection.insertOne({
// 	name: 'Raisyam',
// 	password: 'halo123'
// })

// User.create({
// 	_id: 4,
// 	name: 'Raisyam',
// 	password: 'halo123'
// })

// const user = new Users({
// 	name: 'Raisyam',
// 	password: 'halo123'
// })

// user.save()

// console.log('Successfully add data.')

// EXPRESS API ROUTES
// GET
app.get('/users/:userName/:password', (req, res) => {
  const { userName, password } = req.params;

  User.findOne({ name: userName }, (err, user) => {
    if (user != null) {
      if (password == user.password) {
        res.json({ message: 'Login successful!' });
      } else {
        res.status(400).send({
          message: 'Wrong password!',
        });
      }
    } else {
      res.status(400).send({
        message: 'Username unavailable',
      });
    }
  });
});

app.get('/tweet', (req, res) => {
  let allTweetsList = [];

  Tweet.find({}, (err, tweetsOfPeople) => {
    tweetsOfPeople.forEach((tweets) => {
      // console.log(tweets.tweets.length);
      // console.log('------');
      if (tweets.tweets.length > 0) {
        console.log(tweets.tweets.length);
        // console.log();
        tweets.tweets.forEach((tweet) => {
          allTweetsList.push(tweet);
        });
      }
    });

    while (allTweetsList.length > 20) {
      allTweetsList.pop();
    }

    // console.log();
    // console.log('TES');
    // console.log(allTweetsList);
    // console.log('SHUFFLE--------------');
    // console.log(shuffleArray(allTweetsList));
    res.json(shuffleArray(allTweetsList));
  });
});

app.get('/tweet/:userName', (req, res) => {
  // res.send(req.params.userName)
  const { userName } = req.params;

  User.findOne({ name: userName }, '_id', (err, id) => {
    Tweet.findOne({ _id: id }, (err, tweets) => {
      res.json(tweets);
    });
  });
});

app.get('/photo/:userName', (req, res) => {
  const { userName } = req.params;
  const path = __dirname + `/public/assets/${userName}.jpg`;
  const alternative = __dirname + '/public/assets/--default.jpg';

  // console.log(path);
  // console.log(`PHOTO EXIST? ${fs.existsSync(path)}`);
  // res.send(fs.existsSync(path));

  if (fs.existsSync(path)) {
    // res.send('EXIST');
    res.sendFile(path);
  } else {
    res.sendFile(alternative);
  }
});

// POST
app.post('/register', (req, res) => {
  // check for duplication
  User.findOne({ name: req.body.name }, (err, data) => {
    if (data != undefined && 'name' in data) {
      if (data.name == req.body.name) {
        res.status(400).send({
          message: 'This username is already picked!',
        });
      }
    } else {
      // if the name hasn't been picked up, create the user collections and tweets collections
      const newAccount = new User(req.body);

      newAccount.save().then(() => {
        User.findOne({ name: req.body.name }, '_id', (err, data) => {
          const newUserTweet = new Tweet({
            _id: data._id,
            tweets: [],
          });

          newUserTweet.save().then(() => {
            res.json({ result: 'OK' });
          });
        });
      });
    }
  });
});
