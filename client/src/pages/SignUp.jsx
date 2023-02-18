import { useState } from 'react'
import CONFIG from '../config.js'

const SignUp = () => {
	const signUpClick = () => {
		const userName = document.querySelector('#signup-username').value
		const password = document.querySelector('#signup-password').value
		const profilePicture = document.querySelector('#signup-profilepic').files[0]

		console.log(userName)
		// console.log(typeof userName)
		console.log(password)
		// console.log(typeof password)
		console.log(profilePicture)
		// console.log(typeof profilePicture)

		fetch(`${CONFIG.BACKEND_URL}`)
	}

	const [isUsernameEmpty, setIsUsernameEmpty] = useState(true)
	const [isPasswordEmpty, setIsPasswordEmpty] = useState(true)
	const [isProfilePicEmpty, setIsProfilePicEmpty] = useState(true)


	const usernameChange = () => {
		if (document.querySelector('#signup-username').value) {
			setIsUsernameEmpty(false)
		} else {
			setIsUsernameEmpty(true)
		}
	}

	const passwordChange = () => {
		if (document.querySelector('#signup-password').value) {
			setIsPasswordEmpty(false)
		} else {
			setIsPasswordEmpty(true)
		}

		console.log(document.querySelector('#signup-password').value)
	}

	const profilePictureChange = () => {
		if (document.querySelector('#signup-profilepic').files[0]) {
			setIsProfilePicEmpty(false)
		} else {
			setIsProfilePicEmpty(true)
		}
	}

	return (
		<div id="login-signup-page">
			<div id="login-signup-component" className="shadow-effect">
				<h3>Sign Up</h3>

				<div>
					<h4>Username</h4>
					<input id="signup-username" onChange={usernameChange} required/>
				</div>

				<div>
					<h4>Password</h4>
					<input id="signup-password" type="password" onChange={passwordChange} required/>
				</div>

				<div>
					<h4>Profile Picture</h4>
					<input id="signup-profilepic" type="file" accept="image/jpeg" onChange={profilePictureChange} />
				</div>

				<button className="button-effect button-yellow" onClick={signUpClick}>Sign Up</button>

				<hr />

				<p>Already a user? <a href="/login">Log In</a></p>
			</div>

			{(isUsernameEmpty || isPasswordEmpty || isProfilePicEmpty) ? 
			(<div id="warning-signup" className="shadow-effect">
				{isUsernameEmpty ? <p>Username is empty.</p> : null}
				{isPasswordEmpty ? <p>Password is empty.</p> : null}
				{isProfilePicEmpty ? <p>Profile picture is empty.</p> : null}
			</div>) : null}
		</div>
	)
}

export default SignUp