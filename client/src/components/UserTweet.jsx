const UserTweet = ({ id }) => {
	return (
		<div id={id}>
			<h1 id="welcome-back">Welcome back, <a href="/masbro">@masbro</a>!</h1>
			<textarea id="tweet-textarea" placeholder="What's happening?"></textarea>
			<div id="user-tweet-buttons">
				<button className="button-effect button-yellow">Edit Close Friends</button>
				<button className="button-effect button-yellow">Tweet ✍</button>
			</div>
		</div>
	)
}

export default UserTweet;