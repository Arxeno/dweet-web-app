import React, { useContext } from 'react';
import Tweet from './Tweet';
import GlobalStateContext from '../context/GlobalStateContext';

const Tweets = ({ tweets, removeTweet }) => {
  const { userNameLogin } = useContext(GlobalStateContext);

  return (
    <div id="tweets-container">
      {tweets.map((data, index) => {
        // console.log(`USERNAME LOGIN ${userNameLogin.state.slice(1)}`);
        // console.log(`DATA.NAME ${data.name}`);
        // console.log(`CONDITION ${data.name == userNameLogin.state.slice(1)}`);
        console.log(`OBJECT ID ${data._id}`);
        console.log(typeof data._id);
        // console.log('---------------------');

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
          />
        );
      })}
    </div>
  );
};

export default Tweets;
