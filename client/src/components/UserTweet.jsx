import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import CONFIG from '../config';
import GlobalStateContext from '../context/GlobalStateContext';

const UserTweet = ({ id, updateTweetsArray, setErrorMessage }) => {
  const { userNameLogin } = useContext(GlobalStateContext);
  const [userLoginTweet, setUserLoginTweet] = useState('');

  const handleChangeTextArea = (event) => {
    setUserLoginTweet(event.target.value);
  };

  const postTweet = () => {
    if (userLoginTweet != '') {
      setErrorMessage('');

      const today = new Date();
      let dd = today.getDate();
      let mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();

      if (dd < 10) {
        dd = '0' + dd.toString();
      }

      if (mm < 10) {
        mm = '0' + mm.toString();
      }

      const fullDate = `${dd}-${mm}-${yyyy}`;

      const body = {
        name: userNameLogin.state.slice(1),
        date: fullDate,
        tweet: userLoginTweet,
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      };

      fetch(
        `${CONFIG.BACKEND_URL}/tweet/${userNameLogin.state.slice(1)}`,
        options
      )
        .then((res) => {
          if (res.status == 400) {
            alert("ERROR! Can't posting tweet");
          }
        })
        .catch((err) => {
          alert("ERROR! Can't posting tweet");
        });

      updateTweetsArray(body);

      setUserLoginTweet('');
    } else {
      setErrorMessage('Tweet must not be empty!');
    }
  };

  return (
    <div id={id}>
      <h1 id="welcome-back">
        Welcome back,
        <br />
        <Link to={`/${userNameLogin.state}`}>{userNameLogin.state}</Link>!
        <span className="emoji">✨</span>
      </h1>
      <textarea
        id="tweet-textarea"
        className="tweet-textarea"
        placeholder="What's happening?"
        onChange={handleChangeTextArea}
        value={userLoginTweet}
      ></textarea>
      <div id="user-tweet-buttons">
        <button className="button-effect button-yellow">
          Edit Close Friends <span className="emoji">😁😎</span>
        </button>
        <button className="button-effect button-yellow" onClick={postTweet}>
          Tweet <span className="emoji">✍</span>
        </button>
      </div>
    </div>
  );
};

export default UserTweet;
