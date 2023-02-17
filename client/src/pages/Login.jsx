const Login = () => {
	return (
		<div id="login-page">
			<div id="login-component" className="shadow-effect">
				<h3>Login</h3>

				<div>
					<h4>Username</h4>
					<input />
				</div>

				<div>
					<h4>Password</h4>
					<input type="password"/>
				</div>

				<button className="button-effect button-yellow">Login</button>

				<hr />

				<p>Need an account? <a href="/signup">Sign up</a></p>
			</div>
		</div>
	)
}

export default Login