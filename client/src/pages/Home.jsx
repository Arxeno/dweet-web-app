import UserTweet from '../components/UserTweet'
import Tweet from '../components/Tweet'

const Home = () => {
	return (
		<div id="home-page">
			<UserTweet id="user-tweet" userName="masbro"/>
			<div id="tweets-container">
				<Tweet />
				<Tweet />
				<Tweet />
				<Tweet />
			</div>
		</div>
	);
}

export default Home;