const BigAccountProfile = ({ imagePhoto, userName }) => {
	return (
		<a id="big-account" href={`/${userName}`}>
			<img src={imagePhoto} />
			<h3 id="big-username">@{userName}</h3>
		</a>
	)
}

export default BigAccountProfile