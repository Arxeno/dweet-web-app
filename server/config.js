require('dotenv').config()

const MONGO_URL = null;

if (process.env.MONGOHOST && process.env.MONGOPASSWORD && process.env.MONGOPORT && process.env.MONGOUSER) {
	const {MONGOHOST, MONGOPASSWORD, MONGOPORT, MONGOUSER} = process.env

	MONGO_URL = `mongodb://${MONGOUSER}:${MONGOPASSWORD}@${MONGOHOST}:${MONGOPORT}`
}

const CONFIG = {
  MONGODB_URL: process.env.MONGODB_URL || MONGO_URL || 'mongodb://127.0.0.1:27017',
  MONGODB_DATABASE: process.env.MONGODB_DATABASE || 'DweetDB',
  FRONT_END_URL: process.env.FRONT_END_URL || 'http:/localhost:3000',
};

module.exports = CONFIG