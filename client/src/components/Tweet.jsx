import Account from './Account';

const Tweet = ({ imagePhoto, userName, date, text, display }) => {
  const deleteThisTweet = () => {
    console.log('DELETE this tweet!');
  };

  return (
    <div className="tweet shadow-effect">
      <Account imagePhoto={imagePhoto} userName={userName} />
      <div className="date">{date}</div>
      <button
        onClick={deleteThisTweet}
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
