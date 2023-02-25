const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  profilePhoto: String,
  name: String,
  password: String,
  description: String,
  targetedCloseFriends: [String],
});

const User = mongoose.model('users', UserSchema);

module.exports = User;
