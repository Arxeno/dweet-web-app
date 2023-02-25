const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const CONFIG = require('./config.js');
const { login, register } = require('./controllers/auth.js');
const {
  giveDescription,
  giveUserProfilePic,
  updateUserDescription,
  uploadUserPhoto,
  giveTargetedCloseFriends,
  addTargetedCloseFriends,
  deleteTargetedCloseFriends,
  giveSearchedUsers,
} = require('./controllers/user.js');
const {
  updateUserTweet,
  deleteUserTweet,
  addUserTweet,
  giveUserTweets,
  giveRandomTweets,
} = require('./controllers/tweet.js');

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

// EXPRESS API ROUTES
// GET
app.get('/users/:userName/:password', login);
app.get('/desc/:userName', giveDescription);
app.get('/tweet', giveRandomTweets);
app.get('/tweet/:userName', giveUserTweets);
app.get('/photo/:userName', giveUserProfilePic);
app.get('/closefriends', giveTargetedCloseFriends);
app.get('/search', giveSearchedUsers)

// POST
app.post('/register', register);
app.post('/tweet/:userName', addUserTweet);
app.post(
  '/upload',
  upload.single('profilepic'),
  uploadUserPhoto,
  (error, req, res, next) => {
    res.status(400).json({ message: error.message });
  }
);
app.post('/closefriends', addTargetedCloseFriends);

// DELETE
app.delete('/tweet/:userName', deleteUserTweet);
app.delete('/closefriends', deleteTargetedCloseFriends);

// PUT
app.put('/desc/:userName', updateUserDescription);
app.put('/tweet/:userName', updateUserTweet);
