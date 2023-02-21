const UserTweet = ({ id, userName }) => {
  return (
    <div id={id}>
      <h1 id="welcome-back">
        Welcome back,
        <a href="/masbro">{userName}</a>!<span className="emoji">✨</span>
      </h1>
      <textarea id="tweet-textarea" placeholder="What's happening?"></textarea>
      <div id="user-tweet-buttons">
        <button className="button-effect button-yellow">
          Edit Close Friends
        </button>
        <button className="button-effect button-yellow">
          Tweet <span className="emoji">✍</span>
        </button>
      </div>
    </div>
  );
};

export default UserTweet;
