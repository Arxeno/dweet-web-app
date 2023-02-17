import Account from './Account'

const Tweet = () => {
	return (
		<div className="tweet shadow-effect">
			<Account imagePhoto="images/profile_picture.jpg" userName="raisyam" />
			<div class="date">17-02-2023</div>
			<button title="delete tweet" className="button-effect">
				<span className="emoji">🗑</span>
			</button>
			<p className="tweet-text">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam erat magna, egestas feugiat eleifend ac, iaculis vel tellus. Integer non lectus nulla.
			</p>
		</div>
	)
}

export default Tweet