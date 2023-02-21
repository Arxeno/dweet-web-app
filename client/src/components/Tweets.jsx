import React, { useContext } from 'react';
import Tweet from './Tweet';
import GlobalStateContext from '../context/GlobalStateContext';

const Tweets = ({ tweets }) => {
  const { userNameLogin } = useContext(GlobalStateContext);

  return (
    <div id="tweets-container">
      {tweets.map((data, index) => {
        console.log(`USERNAME LOGIN ${userNameLogin.state.slice(1)}`);
        console.log(`DATA.NAME ${data.name}`);
        console.log(`CONDITION ${data.name == userNameLogin.state.slice(1)}`);
        console.log('---------------------');

        return (
          <Tweet
            key={index}
            imagePhoto={`images/${data.name}.jpg`}
            userName={`@${data.name}`}
            date={data.date}
            text={data.tweet}
            display={data.name == userNameLogin.state.slice(1)}
          />
        );
      })}
    </div>
  );
};

export default Tweets;
