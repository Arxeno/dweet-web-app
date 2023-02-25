import React, { useContext } from 'react';
import Tweet from './Tweet';
import GlobalStateContext from '../context/GlobalStateContext';

const Tweets = ({ tweets, removeTweet, editTweet }) => {
  const { userNameLogin } = useContext(GlobalStateContext);

  return (
    <div id="tweets-container">
      {tweets.length > 0 ? tweets.map((data, index) => {
        return (
          <Tweet
            tweetId={data._id}
            key={index}
            imagePhoto={`images/${data.name}.jpg`}
            userName={`@${data.name}`}
            date={data.date}
            text={data.tweet}
            display={data.name == userNameLogin.state.slice(1)}
            removeTweet={() => removeTweet(index)}
            editThisTweet={(tweetText) => editTweet(tweetText, index)}
          />
        );
      }) : <h2 className='no-tweet'>No tweet...<span className="emoji">🕊</span></h2>}
    </div>
  );
};

export default Tweets;
