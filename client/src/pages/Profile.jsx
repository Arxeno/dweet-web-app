import { useParams } from 'react-router-dom'
import BigAccountProfile from '../components/BigAccountProfile'
import Tweet from '../components/Tweet'

const Profile = () => {
	let { userName } = useParams()

  return (
    <div id="profile-page">
    	<BigAccountProfile
    		imagePhoto={`images/${userName}.jpg`}
    		userName={userName}
    	/>
    	<p>
    		Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    		Aliquam erat magna, egestas feugiat eleifend ac, iaculis vel tellus.
    		Integer non lectus nulla.
    	</p>
    	<div id="tweets-container">
				<Tweet
					imagePhoto="https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg"
					userName="masbro"
					date="17-02-2023"
					text="Dweet RISTEK is dope 🔥!"
					displayNone={false}
				/>
				<Tweet
					imagePhoto="https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg"
					userName="masbro"
					date="17-02-2023"
					text="Keren masbro"
					displayNone={false}
				/>
			</div>
    </div>
  )
}

export default Profile;