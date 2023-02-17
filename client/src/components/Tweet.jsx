import Account from './Account'

const Tweet = ({ imagePhoto, userName, date, text, displayNone }) => {
	if (displayNone) {
		let displayStyle = 'none'
	} else {
		let displayStyle = 'block'
	}

	return (
		<div className="tweet shadow-effect">
			<Account imagePhoto={imagePhoto} userName={userName} />
			<div class="date">{date}</div>
			<button title="delete tweet" className="button-effect" style={displayNone? {display: 'none'} : {display: 'block'}}>
				<span className="emoji">🗑</span>
			</button>
			<p className="tweet-text">
				{text}
			</p>
		</div>
	)
}

export default Tweet