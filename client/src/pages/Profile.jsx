import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BigAccountProfile from '../components/BigAccountProfile';
import Navbar from '../components/Navbar';
import GlobalStateContext from '../context/GlobalStateContext';
import Tweets from '../components/Tweets';
import CONFIG from '../config';
import EditTweet from '../components/EditTweet';
import EditDesc from '../components/EditDesc';
import EditProfilePic from '../components/EditProfilePic';

const Profile = () => {
  let { userName } = useParams();
  const [tweets, setTweets] = useState([]);

  const [showEditTweetComponent, setShowEditTweetComponent] = useState(false);
  const [editTweetText, setEditTweetText] = useState('');
  const [editTweetIndex, setEditTweetIndex] = useState(-1);

  const [description, setDescription] = useState('');
  const [showDescriptionForm, setShowDescriptionForm] = useState(false);

  const [showChangeProfilePicForm, setShowChangeProfilePicForm] =
    useState(false);

  const { isLogin, userNameLogin, userNameLoginPhoto } =
    useContext(GlobalStateContext);

  const logOutClick = () => {
    userNameLoginPhoto.setState(null);
    userNameLogin.setState(null);
    window.location.href = `/login`;
    isLogin.setState(false);
  };

  const getPersonTweetData = async () => {
    fetch(`${CONFIG.BACKEND_URL}/tweet/${userName}`, { method: 'GET' })
      .then((response) => response.json())
      .then((responseJson) => {
        const tweetsFromNewest = responseJson.tweets.reverse();

        setTweets(tweetsFromNewest);
      })
      .catch((error) => alert(error));
  };

  const getPersonDescriptionData = () => {
    fetch(`${CONFIG.BACKEND_URL}/desc/${userName}`, { method: 'GET' })
      .then((response) => response.json())
      .then((responseJson) => {
        setDescription(
          responseJson.description || `Hi! I am ${userName}! I am using Dweet!`
        );
      })
      .catch((error) => alert(error));
  };

  const fetchDeleteTweet = async (tweetDeleted) => {
    const options = { method: 'DELETE' };

    fetch(
      `${CONFIG.BACKEND_URL}/tweet/${tweetDeleted.name}?id=${tweetDeleted._id}`,
      options
    );
  };

  const removeTweetFromProfile = async (indexDeleted) => {
    const newTweets = tweets.filter(
      (currentValue, index) => index != indexDeleted
    );

    const tweetDeletedArray = tweets.filter(
      (currentValue, index) => index == indexDeleted
    );
    const tweetDeleted = tweetDeletedArray[0];

    setTweets(newTweets);

    await fetchDeleteTweet(tweetDeleted);
  };

  const fetchEditTweet = (editedTweet) => {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editedTweet),
    };

    fetch(`${CONFIG.BACKEND_URL}/tweet/${editedTweet.name}`, options);
  };

  const editThisTweet = (tweetText, index) => {
    setEditTweetText(tweetText);
    setShowEditTweetComponent(true);
    setEditTweetIndex(index);
  };

  const removeEditTweet = () => {
    setShowEditTweetComponent(false);
  };

  const confirmEditTweet = async (newTweet) => {
    removeEditTweet();

    const editedTweet = tweets[editTweetIndex];

    editedTweet.tweet = newTweet;

    await fetchEditTweet(editedTweet);
  };

  const fetchEditDescription = (newDesc) => {
    const options = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description: newDesc }),
    };

    fetch(`${CONFIG.BACKEND_URL}/desc/${userName}`, options);
  };

  const changeDescriptionHandlerClick = () => {
    setShowDescriptionForm(true);
  };

  const removeEditDesc = () => {
    setShowDescriptionForm(false);
  };

  const confirmEditDesc = async (newDesc) => {
    removeEditDesc();

    setDescription(newDesc);

    await fetchEditDescription(newDesc);
  };

  const changeProfilePictureHandlerClick = () => {
    setShowChangeProfilePicForm(true);
  };

  const removeEditProfilePic = () => {
    setShowChangeProfilePicForm(false);
  };

  useEffect(() => {
    getPersonTweetData();
    getPersonDescriptionData();
  }, []);

  return (
    <div>
      <Navbar />
      <div id="profile-page">
        <BigAccountProfile userName={userName} />
        <p>{description}</p>

        <div
          id="profile-buttons-div"
          style={
            userNameLogin.state.slice(1) == userName
              ? { display: 'grid' }
              : { display: 'none' }
          }
        >
          <button
            id="change-profile-picture"
            className="button-yellow button-effect"
            onClick={changeProfilePictureHandlerClick}
          >
            <span className="emoji">🖼</span>Change Profile Picture
          </button>

          <button
            id="change-description"
            className="button-yellow button-effect"
            onClick={changeDescriptionHandlerClick}
          >
            <span className="emoji">😀</span>Change Description
          </button>

          <button
            id="log-out"
            className="button-yellow button-effect"
            onClick={logOutClick}
          >
            <span className="emoji">🏃‍♀️💨</span>Log Out
          </button>
        </div>

        <Tweets
          tweets={tweets}
          removeTweet={(index) => removeTweetFromProfile(index)}
          editTweet={(tweetText, index) => editThisTweet(tweetText, index)}
        />
      </div>
      {showEditTweetComponent ? (
        <EditTweet
          removeThisComponent={removeEditTweet}
          tweetText={editTweetText}
          confirmEdit={confirmEditTweet}
        />
      ) : null}

      {showDescriptionForm ? (
        <EditDesc
          removeThisComponent={removeEditDesc}
          descText={description}
          confirmEdit={confirmEditDesc}
        />
      ) : null}

      {showChangeProfilePicForm ? (
        <EditProfilePic removeThisComponent={removeEditProfilePic} />
      ) : null}

      {!isLogin.state ? <Navigate to="/" /> : null}
    </div>
  );
};

export default Profile;
