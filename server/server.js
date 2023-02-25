const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');
const bcrypt = require('bcrypt');
const CONFIG = require('./config.js');

// BCRYPT
const saltRounds = 10;

// PROFILE PICS STORAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'server/public/assets');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime().toString() + ' - ' + file.originalname);
  },
});

const upload = multer({ storage: storage, limits: { fileSize: 8000000 } });

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
app.use(express.json({ extended: true, limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

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
  description: String,
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

// EXPRESS API ROUTES
// GET
app.get('/users/:userName/:password', (req, res) => {
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
});

app.get('/desc/:userName', (req, res) => {
  const { userName } = req.params;

  User.findOne({ name: userName }, 'description', (err, description) => {
    res.json(description);
  });
});

app.get('/tweet', (req, res) => {
  let allTweetsList = [];

  Tweet.find({}, (err, tweetsOfPeople) => {
    tweetsOfPeople.forEach((tweets) => {
      if (tweets.tweets.length > 0) {
        tweets.tweets.forEach((tweet) => {
          allTweetsList.push(tweet);
        });
      }
    });

    while (allTweetsList.length > 20) {
      allTweetsList.pop();
    }

    res.json(shuffleArray(allTweetsList));
  });
});

app.get('/tweet/:userName', (req, res) => {
  const { userName } = req.params;

  User.findOne({ name: userName }, '_id', (err, id) => {
    Tweet.findOne({ _id: id }, (err, tweets) => {
      res.json(tweets);
    });
  });
});

app.get('/photo/:userName', (req, res) => {
  const userName = req.params.userName;

  User.findOne({ name: userName }, 'profilePhoto', (err, user) => {
    const path = __dirname + `/public/assets/${user.profilePhoto}`;
    const alternative = __dirname + '/public/assets/--default.jpg';

    if (fs.existsSync(path)) {
      res.sendFile(path);
    } else {
      res.sendFile(alternative);
    }
  });
});

// POST
app.post('/register', (req, res) => {
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
});

app.post('/tweet/:userName', (req, res) => {
  const { userName } = req.params;

  // kalau nama user tidak tersedia di database, send error message
  User.findOne({ name: userName }, '_id', (err, id) => {
    // get user's tweets data
    Tweet.findOne({ _id: id }, 'tweets', (err, tweets) => {
      const { name, date, tweet } = req.body;

      // add new tweet
      tweets.tweets.push({
        name: name,
        date: date,
        tweet: tweet,
      });

      // update user's tweet data
      Tweet.updateOne({ _id: id }, { tweets: tweets.tweets }, (err, docs) => {
        if (err) {
          res.json({ message: 'add tweet error' });
        } else {
          res.json({ message: 'successfully add tweet' });
        }
      });
    });
  });

  // kalau ada, posting
});

app.post(
  '/upload',
  upload.single('profilepic'),
  async (req, res) => {
    User.findOne({ name: req.body.name }, (err, user) => {
      const prevProfilePhotoPath = `${__dirname}/public/assets/${user.profilePhoto}`;

      if (fs.existsSync(prevProfilePhotoPath)) {
        fs.unlinkSync(prevProfilePhotoPath);
      }

      User.updateOne(
        { name: req.body.name },
        { profilePhoto: req.file.filename },
        (err, docs) => {
          if (err) {
            res.json({ message: 'Uploading file error' });
          } else {
            res.json({ message: 'File uploaded!' });
          }
        }
      );
    });
  },
  (error, req, res, next) => {
    res.status(400).json({ message: error.message });
  }
);

// DELETE
app.delete('/tweet/:userName', (req, res) => {
  const { userName } = req.params;
  const tweetId = req.query.id;

  // search user by name to get the id
  User.findOne({ name: userName }, '_id', (err, id) => {
    // use the user id to get the id of tweets
    Tweet.findOne({ _id: id }, (err, tweets) => {
      const newTweets = tweets.tweets.filter(
        (tweet) => tweetId != tweet._id.toString()
      );

      Tweet.updateOne({ _id: id }, { tweets: newTweets }, (err, docs) => {
        if (err) {
          res.json({ message: 'delete tweet error' });
        } else {
          res.json({ message: 'successfully delete tweet' });
        }
      });
    });
  });
});

// PUT
app.put('/desc/:userName', (req, res) => {
  const newDescObj = req.body;
  const { userName } = req.params;

  User.updateOne({ name: userName }, newDescObj, (err, docs) => {
    if (err) {
      res.json({ message: 'update description error' });
    } else {
      res.json({ message: 'successfully update description' });
    }
  });
});

app.put('/tweet/:userName', (req, res) => {
  const { userName } = req.params;
  const editedTweet = req.body;

  User.findOne({ name: editedTweet.name }, '_id', (err, id) => {
    Tweet.findOne({ _id: id }, 'tweets', (err, tweets) => {
      const newTweets = tweets.tweets.map((tweetObject) => {
        if (editedTweet._id == tweetObject._id.toString()) {
          tweetObject.tweet = editedTweet.tweet;
          return tweetObject;
        }

        return tweetObject;
      });

      Tweet.updateOne({ _id: id }, { tweets: newTweets }, (err, docs) => {
        if (err) {
          res.json({ message: 'delete tweet error' });
        } else {
          res.json({ message: 'successfully delete tweet' });
        }
      });
    });
  });
});
