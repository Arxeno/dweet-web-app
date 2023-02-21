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
  name: String,
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
        // console.log(tweets.tweets.length);
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
  // res.send('hello');

  User.findOne({ name: userName }, '_id', (err, id) => {
    console.log('TWEET ID');
    console.log(id);

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

app.post('/tweet/:userName', (req, res) => {
  const { userName } = req.params;

  // kalau nama user tidak tersedia di database, send error message
  User.findOne({ name: userName }, '_id', (err, id) => {
    // console.log(id);

    // get user's tweets data
    Tweet.findOne({ _id: id }, 'tweets', (err, tweets) => {
      const { name, date, tweet } = req.body;

      console.log(req.body);
      console.log(tweets);

      // add new tweet
      tweets.tweets.push({
        name: name,
        date: date,
        tweet: tweet,
      });

      console.log('after push');
      console.log(tweets);

      // update user's tweet data
      Tweet.updateOne({ _id: id }, { tweets: tweets.tweets }, (err, docs) => {
        if (err) {
          console.log('add tweet error');
        } else {
          console.log('successfully add tweet');
        }
      });
    });
  });

  // kalau ada, posting
});

// DELETE
app.delete('/tweet/:userName', (req, res) => {
  const { userName } = req.params;
  const tweetId = req.query.id;

  console.log(`id query ${tweetId}`);
  console.log(`username ${userName}`);

  // search user by name to get the id
  User.findOne({ name: userName }, '_id', (err, id) => {
    console.log('user find one');
    console.log(id);

    // use the user id to get the id of tweets
    Tweet.findOne({ _id: id }, (err, tweets) => {
      console.log('tweet find one');
      console.log(tweets.tweets);
      // console.log(tweetId);
      console.log('filter-------');
      // console.log(tweet._id.toString());

      const newTweets = tweets.tweets.filter(
        (tweet) => tweetId != tweet._id.toString()
      );

      console.log(newTweets);

      Tweet.updateOne({ _id: id }, { tweets: newTweets }, (err, docs) => {
        if (err) {
          console.log('delete tweet error');
        } else {
          console.log('successfully delete tweet');
        }
      });
    });
  });
});
