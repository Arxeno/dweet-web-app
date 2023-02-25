import { useContext, useEffect, useState } from 'react';
import UserTweet from '../components/UserTweet';
import Navbar from '../components/Navbar';
import CONFIG from '../config';
import Tweets from '../components/Tweets';
import EditTweet from '../components/EditTweet';
import EditCloseFriends from '../components/EditCloseFriends';
import GlobalStateContext from '../context/GlobalStateContext';

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const [showEditTweetComponent, setShowEditTweetComponent] = useState(false);
  const [showEditCloseFriendComponent, setShowEditCloseFriendComponent] =
    useState(false);
  const [editTweetText, setEditTweetText] = useState('');
  const [editTweetIndex, setEditTweetIndex] = useState(-1);
  const [errorMessage, setErrorMessage] = useState('');

  const { userNameLogin } = useContext(GlobalStateContext);

  const getRandomTweetData = async () => {
    fetch(
      `${CONFIG.BACKEND_URL}/tweet?name=${userNameLogin.state.slice(1)}&mode=closeFriend`,
      { method: 'GET' }
    )
      .then((response) => response.json())
      .then((responseJson) => setTweets(responseJson))
      .catch((error) => alert(error));
  };

  const updateTweetsArray = (newTweet) => {
    const newTweets = [newTweet].concat(tweets);

    while (newTweets.length > 20) {
      newTweets.pop();
    }

    setTweets(newTweets);
  };

  const fetchDeleteTweet = async (tweetDeleted) => {
    const options = { method: 'DELETE' };

    fetch(
      `${CONFIG.BACKEND_URL}/tweet/${tweetDeleted.name}?id=${tweetDeleted._id}`,
      options
    );
  };

  const removeTweetFromHome = async (indexDeleted) => {
    const newTweets = tweets.filter(
      (currentValue, index) => index != indexDeleted
    );
    const tweetDeletedArray = tweets.filter(
      (currentValue, index) => index == indexDeleted
    );
    const tweetDeleted = tweetDeletedArray[0];

    // set tweets to new value in order to reload the new tweets list
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
    console.log('Backdrop clicked!');
    setShowEditTweetComponent(false);
  };

  const confirmEdit = async (newTweet) => {
    removeEditTweet();
    const editedTweet = tweets[editTweetIndex];
    editedTweet.tweet = newTweet;
    await fetchEditTweet(editedTweet);
  };

  const editCloseFriends = () => {
    setShowEditCloseFriendComponent(true);
  };

  const removeEditCloseFriends = () => {
    setShowEditCloseFriendComponent(false);
  };

  useEffect(() => {
    getRandomTweetData();
  }, []);

  return (
    <div>
      <Navbar />
      <div id="home-page">
        <UserTweet
          id="user-tweet"
          updateTweetsArray={(element) => updateTweetsArray(element)}
          setErrorMessage={setErrorMessage}
          showEditCloseFriend={editCloseFriends}
        />

        {errorMessage ? (
          <div id="warning-home" className="shadow-effect">
            {errorMessage ? <p>{errorMessage}</p> : null}
          </div>
        ) : null}

        <Tweets
          tweets={tweets}
          removeTweet={(index) => removeTweetFromHome(index)}
          editTweet={(tweetText, index) => editThisTweet(tweetText, index)}
        />
        {showEditTweetComponent ? (
          <EditTweet
            removeThisComponent={removeEditTweet}
            tweetText={editTweetText}
            confirmEdit={confirmEdit}
          />
        ) : null}

        {showEditCloseFriendComponent ? (
          <EditCloseFriends removeThisComponent={removeEditCloseFriends} />
        ) : null}
      </div>
    </div>
  );
};

export default Home;
