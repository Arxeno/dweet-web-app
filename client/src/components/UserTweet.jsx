import { useContext, useState } from 'react';
import CONFIG from '../config';
import GlobalStateContext from '../context/GlobalStateContext';
import { Link } from 'react-router-dom';

const UserTweet = ({ id, updateTweets }) => {
  const { userNameLogin } = useContext(GlobalStateContext);
  const [userLoginTweet, setUserLoginTweet] = useState('');

  const handleChangeTextArea = (event) => {
    setUserLoginTweet(event.target.value);
  };

  const postTweet = () => {
    if (userLoginTweet != '') {
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

      console.log(fullDate);

      const body = {
        name: userNameLogin.state.slice(1),
        date: fullDate,
        tweet: userLoginTweet,
      };

      console.log(body);

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      };

      console.log('posting tweet!');
      // console.log(`${CONFIG.BACKEND_URL}/tweet/${userName.slice(1)}`);
      fetch(
        `${CONFIG.BACKEND_URL}/tweet/${userNameLogin.state.slice(1)}`,
        options
      )
        .then((res) => {
          // res.json()
          console.log(res.status);

          if (res.status == 400) {
            console.error("ERROR! Can't posting tweet");
          } else {
            console.log('posting tweet success');
            // window.location.href = `/login`;
          }
        })
        .catch((err) => {
          console.error("ERROR! Can't posting tweet");
        });

      updateTweets(body);

      setUserLoginTweet('');
    } else {
      alert('Tweet must not be empty!');
    }
  };

  return (
    <div id={id}>
      <h1 id="welcome-back">
        Welcome back,
        <Link to={`/${userNameLogin.state}`}>{userNameLogin.state}</Link>!
        <span className="emoji">✨</span>
      </h1>
      <textarea
        id="tweet-textarea"
        placeholder="What's happening?"
        onChange={handleChangeTextArea}
        value={userLoginTweet}
      ></textarea>
      <div id="user-tweet-buttons">
        <button className="button-effect button-yellow">
          Edit Close Friends
        </button>
        <button className="button-effect button-yellow" onClick={postTweet}>
          Tweet <span className="emoji">✍</span>
        </button>
      </div>
    </div>
  );
};

export default UserTweet;
