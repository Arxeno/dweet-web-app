const mongoose = require('mongoose');

const OneTweetSchema = new mongoose.Schema({
  name: String,
  date: String,
  tweet: String,
});

const TweetsSchema = new mongoose.Schema({
  _id: mongoose.ObjectId,
  tweets: [OneTweetSchema],
});

const Tweet = mongoose.model('tweets', TweetsSchema);

module.exports = Tweet;
