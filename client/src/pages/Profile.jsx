import { useParams } from 'react-router-dom';
import BigAccountProfile from '../components/BigAccountProfile';
import Tweet from '../components/Tweet';
import Navbar from '../components/Navbar';
import { useContext, useEffect, useState } from 'react';
import GlobalStateContext from '../context/GlobalStateContext';
import Tweets from '../components/Tweets';
import CONFIG from '../config';

const Profile = () => {
  let { userName } = useParams();
  const [tweets, setTweets] = useState([]);
  const { isLogin, userNameLogin } = useContext(GlobalStateContext);
  console.log(`IS LOGIN -> ${isLogin.state}`);

  const logOutClick = () => {
    isLogin.setState(false);
    userNameLogin.setState(null);
  };

  const getPersonTweetData = async () => {
    fetch(`${CONFIG.BACKEND_URL}/tweet/${userName}`, { method: 'GET' })
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        setTweets(responseJson.tweets);
        // console.log(tweets);
      })
      .catch((error) => console.error(error));
  };

  const removeTweetFromProfile = (indexDeleted) => {
    console.log('tweet deleted from profile');

    const newTweets = tweets.filter(
      (currentValue, index) => index != indexDeleted
    );
    setTweets(newTweets);
  };

  useEffect(() => {
    getPersonTweetData();
    // console.log(tweets);
  }, []);

  return (
    <div>
      <Navbar />
      <div id="profile-page">
        <BigAccountProfile
          imagePhoto={`images/${userName}.jpg`}
          userName={userName}
        />
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat
          magna, egestas feugiat eleifend ac, iaculis vel tellus. Integer non
          lectus nulla.
        </p>
        <button
          id="log-out"
          className="button-yellow button-effect"
          onClick={logOutClick}
        >
          Log Out
        </button>
        <Tweets
          tweets={tweets}
          removeTweet={(index) => removeTweetFromProfile(index)}
        />
        {/* <div id="tweets-container">
          <Tweet
            imagePhoto="images/masbro.jpg"
            userName="masbro"
            date="17-02-2023"
            text="Dweet RISTEK is dope 🔥!"
            displayNone={false}
          />
          <Tweet
            imagePhoto="images/masbro.jpg"
            userName="masbro"
            date="17-02-2023"
            text="Keren masbro"
            displayNone={false}
          />
        </div> */}
      </div>
      {!isLogin.state ? <Navigate to="/" /> : null}
    </div>
  );
};

export default Profile;
