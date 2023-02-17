const SignUp = () => {
	return (
		<div id="login-signup-page">
			<div id="login-signup-component" className="shadow-effect">
				<h3>Sign Up</h3>

				<div>
					<h4>Username</h4>
					<input />
				</div>

				<div>
					<h4>Password</h4>
					<input type="password"/>
				</div>

				<button className="button-effect button-yellow">Sign Up</button>

				<hr />

				<p>Already a user? <a href="/login">Log In</a></p>
			</div>
		</div>
	)
}

export default SignUp