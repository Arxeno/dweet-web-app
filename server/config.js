require('dotenv').config()

const CONFIG = {
  MONGODB_URL: process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017',
  MONGODB_DATABASE: process.env.MONGODB_DATABASE || 'DweetDB',
  FRONT_END_URL: process.env.FRONT_END_URL || 'http:/localhost:3000',
};

module.exports = CONFIG