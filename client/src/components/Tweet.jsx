import Account from './Account';

const Tweet = ({
  tweetId,
  imagePhoto,
  userName,
  date,
  text,
  display,
  removeTweet,
}) => {
  // const deleteThisTweet = () => {
  //   console.log('DELETE this tweet!--------------');
  //   console.log(`TWEET ID: ${tweetId}`);
  //   console.log(`USERNAME: ${userName.slice(1)}`);

  //   document.querySelector(`#tweet-${tweetId}`).remove;
  // };

  return (
    <div id={`tweet-${tweetId}`} className="tweet shadow-effect">
      <Account imagePhoto={imagePhoto} userName={userName} />
      <div className="date">{date}</div>
      <button
        onClick={removeTweet}
        title="delete tweet"
        className="button-effect"
        style={display ? { display: 'block' } : { display: 'none' }}
      >
        <span className="emoji">🗑</span>
      </button>
      <p className="tweet-text">{text}</p>
    </div>
  );
};

export default Tweet;
