const Account = ({ imagePhoto, userName }) => {
	return (
		<a className="account" href={`/${userName}`}>
			<img src={imagePhoto} />
			<h3 className="username">{userName}</h3>
		</a>
	)
}

export default Account