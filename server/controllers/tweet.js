const User = require('../models/User');
const Tweet = require('../models/Tweet');
const shuffleArray = require('../utils/helper');

const giveRandomTweets = (req, res) => {
  const { mode } = req.query;

  if (mode == 'closeFriend') {
    const { name } = req.query;

    let allTweetsList = [];

    User.findOne(
      { name },
      'targetedCloseFriends',
      async (err, closeFriends) => {
        let {targetedCloseFriends} = closeFriends
        targetedCloseFriends.push(name)

        if (targetedCloseFriends != []) {
          try {
            for (const friendName of targetedCloseFriends) {
              const id = await User.findOne({ name: friendName }, '_id');
              const tweets = await Tweet.findOne({ _id: id._id }, 'tweets');

              tweets.tweets.forEach((tweet) => {
                allTweetsList.push(tweet);
              });
            }

            allTweetsList = shuffleArray(allTweetsList);

            while (allTweetsList.length > 20) {
              allTweetsList.pop();
            }

            res.json(allTweetsList);
          } catch (err) {
            res.json(err);
          }
        } else {
          res.json([]);
        }
      }
    );
  } else if (mode == 'random') {
    let allTweetsList = [];

    Tweet.find({}, (err, tweetsOfPeople) => {
      tweetsOfPeople.forEach((tweets) => {
        if (tweets.tweets.length > 0) {
          tweets.tweets.forEach((tweet) => {
            allTweetsList.push(tweet);
          });
        }
      });

      allTweetsList = shuffleArray(allTweetsList);

      while (allTweetsList.length > 20) {
        allTweetsList.pop();
      }

      res.json(allTweetsList);
    });
  }
};

const addUserTweet = (req, res) => {
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
};

const updateUserTweet = (req, res) => {
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
};

const deleteUserTweet = (req, res) => {
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
};

const giveUserTweets = (req, res) => {
  const { userName } = req.params;

  User.findOne({ name: userName }, '_id', (err, id) => {
    Tweet.findOne({ _id: id }, (err, tweets) => {
      res.json(tweets);
    });
  });
};

module.exports = {
  giveRandomTweets,
  addUserTweet,
  updateUserTweet,
  deleteUserTweet,
  giveUserTweets,
};
