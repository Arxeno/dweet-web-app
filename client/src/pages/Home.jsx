import UserTweet from '../components/UserTweet';
import Tweet from '../components/Tweet';
import { useContext, useEffect, useState } from 'react';
import GlobalStateContext from '../context/GlobalStateContext';
import Navbar from '../components/Navbar';
import CONFIG from '../config';
import Tweets from '../components/Tweets';

const Home = () => {
  const [tweets, setTweets] = useState([]);
  const { isLogin, userNameLogin } = useContext(GlobalStateContext);
  console.log(`IS LOGIN -> ${isLogin.state}`);

  const getRandomTweetData = async () => {
    fetch(`${CONFIG.BACKEND_URL}/tweet`, { method: 'GET' })
      .then((response) => response.json())
      .then((responseJson) => setTweets(responseJson))
      .catch((error) => console.error(error));
  };

  const removeTweetFromHome = (indexDeleted) => {
    console.log('tweet deleted from home');

    const newTweets = tweets.filter(
      (currentValue, index) => index != indexDeleted
    );
    setTweets(newTweets);
  };

  useEffect(() => {
    getRandomTweetData();
  }, []);

  return (
    <div>
      <Navbar />
      <div id="home-page">
        <UserTweet id="user-tweet" />
        <Tweets
          tweets={tweets}
          removeTweet={(index) => removeTweetFromHome(index)}
        />
        {/* <div id="tweets-container">
          {tweets.map((data) => {
            return (
              <Tweet
                imagePhoto={`images/${data.name}.jpg`}
                userName={data.name}
                date={data.date}
                text={data.tweet}
                displayNone={data.name == userNameLogin.state ? true : false}
              />
            );
          })} */}

        {/* {async () => {
            const tweets = await getRandomTweetData();
            const newTweets = tweets.map((data) => {
              return (
                <Tweet
                  imagePhoto={`images/${data.name}.jpg`}
                  userName={data.name}
                  date={data.date}
                  text={data.tweet}
                  displayNone={data.name == userNameLogin.state ? true : false}
                />
              );
            });

            return newTweets;
          }} */}

        {/* <Tweet
            imagePhoto="images/masbro.jpg"
            userName="masbro"
            date="17-02-2023"
            text="Dweet RISTEK is dope 🔥!"
            displayNone={false}
          />
          <Tweet
            imagePhoto="images/raisyam.jpg"
            userName="raisyam"
            date="17-02-2023"
            text="keren masbro"
            displayNone={true}
          />
          <Tweet
            imagePhoto="images/raisyam.jpg"
            userName="raisyam"
            date="17-02-2023"
            text="ada ada aja si masbro"
            displayNone={true}
          />
          <Tweet
            imagePhoto="images/masbro.jpg"
            userName="masbro"
            date="17-02-2023"
            text="Keren masbro"
            displayNone={false}
          />
          <Tweet
            imagePhoto="images/raisyam.jpg"
            userName="raisyam"
            date="17-02-2023"
            text="aduh si masbro"
            displayNone={true}
          /> */}
        {/* </div> */}
      </div>
    </div>
  );
};

export default Home;
