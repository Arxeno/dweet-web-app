const fs = require('fs');
const path = require('path');
const User = require('../models/User');

const giveDescription = (req, res) => {
  const { userName } = req.params;

  User.findOne({ name: userName }, 'description', (err, description) => {
    res.json(description);
  });
};

const giveUserProfilePic = (req, res) => {
  const userName = req.params.userName;

  User.findOne({ name: userName }, 'profilePhoto', (err, user) => {
    if (user.profilePhoto) {
      const profilePicturePath = path.join(
        __dirname,
        '..',
        `/public/assets/${user.profilePhoto}`
      );
      const alternative = path.join(
        __dirname,
        '..',
        '/public/assets/--default.jpg'
      );

      if (fs.existsSync(profilePicturePath)) {
        res.sendFile(profilePicturePath);
      } else {
        res.sendFile(alternative);
      }
    }
  });
};

const updateUserDescription = (req, res) => {
  const newDescObj = req.body;
  const { userName } = req.params;

  User.updateOne({ name: userName }, newDescObj, (err, docs) => {
    if (err) {
      res.json({ message: 'update description error' });
    } else {
      res.json({ message: 'successfully update description' });
    }
  });
};

const uploadUserPhoto = async (req, res) => {
  User.findOne({ name: req.body.name }, (err, user) => {
    const prevProfilePhotoPath = path.join(
      __dirname,
      '..',
      `public/assets/${user.profilePhoto}`
    );
    console.log(prevProfilePhotoPath);

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
};

const addTargetedCloseFriends = (req, res) => {
  const { name, target } = req.body;

  if (name != target) {
    User.findOne({ name: target }, 'targetedCloseFriends', (err, data) => {
      let { targetedCloseFriends } = data;

      if (targetedCloseFriends.indexOf(name) == -1) {
        targetedCloseFriends.push(name);

        User.updateOne(
          { name: target },
          { targetedCloseFriends },
          (err, docs) => {
            if (err) {
              res.json({ message: 'Add friend error!' });
            } else {
              res.json({ message: 'Successfully add friend' });
            }
          }
        );
      } else {
        res.status(400).json({ message: 'Already added!' });
      }
    });
  } else {
    res.status(400).json({ message: 'Cannot add friend to yourself!' });
  }
};

const giveTargetedCloseFriends = (req, res) => {
  const { name } = req.body;

  User.findOne({ name: name }, 'targetedCloseFriends', (err, data) => {
    res.json(data);
  });
};

const deleteTargetedCloseFriends = (req, res) => {
  const { name, target } = req.body;

  User.findOne({ name: target }, 'targetedCloseFriends', (err, data) => {
    let { targetedCloseFriends } = data;

    targetedCloseFriends = targetedCloseFriends.filter(
      (targetFriends) => targetFriends != name
    );

    User.updateOne({ name: target }, { targetedCloseFriends }, (err, docs) => {
      if (err) {
        res.json({ message: 'Delete friend error!' });
      } else {
        res.json({ message: 'Successfully delete friend' });
      }
    });
  });
};

const giveSearchedUsers = async (req, res) => {
  const result = await User.find({ name: { $regex: req.query.q, $options: 'i' } }, ['name', 'targetedCloseFriends']);
  res.json(result);
};

module.exports = {
  giveDescription,
  giveUserProfilePic,
  updateUserDescription,
  uploadUserPhoto,
  giveTargetedCloseFriends,
  addTargetedCloseFriends,
  deleteTargetedCloseFriends,
  giveSearchedUsers,
};
