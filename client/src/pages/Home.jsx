import UserTweet from '../components/UserTweet'
import Tweet from '../components/Tweet'

const Home = () => {
	return (
		<div id="home-page">
			<UserTweet id="user-tweet" userName="masbro"/>
			<div id="tweets-container">
				<Tweet
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
				/>
			</div>
		</div>
	);
}

export default Home;