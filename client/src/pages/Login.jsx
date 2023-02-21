import { useContext, useState } from 'react';
import CONFIG from '../config';
import GlobalStateContext from '../context/GlobalStateContext';
import { Navigate } from 'react-router-dom';

const LogIn = () => {
  // { setIsLogIn, setUserNameState }
  const [isLoginError, setIsLoginError] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(true);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);
  const { isLogin, userNameLogin } = useContext(GlobalStateContext);

  // console.log(`IS LOGIN -> ${isLogin.state}`);

  const logInClick = () => {
    const userName = document.querySelector('#login-username').value;
    const password = document.querySelector('#login-password').value;

    // alert(userName + password)

    const options = {
      method: 'GET',
    };

    fetch(`${CONFIG.BACKEND_URL}/users/${userName}/${password}`, options)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson.message);

        if (
          responseJson.message == 'Username unavailable' ||
          responseJson.message == 'Wrong password!'
        ) {
          console.log(responseJson.message);
          setIsLoginError(true);
          setLoginError(responseJson.message);
        } else {
          console.log(responseJson.message);
          setIsLoginError(false);
          // setUserNameState(`@${userName}`)
          // setIsLogIn(true)
          userNameLogin.setState(`@${userName}`);
          isLogin.setState(true);
        }
      })
      .catch((err) => console.error(err));
  };

  const usernameChange = () => {
    if (document.querySelector('#login-username').value) {
      setIsUsernameEmpty(false);
    } else {
      setIsUsernameEmpty(true);
    }
  };

  const passwordChange = () => {
    if (document.querySelector('#login-password').value) {
      setIsPasswordEmpty(false);
    } else {
      setIsPasswordEmpty(true);
    }

    // console.log(document.querySelector('#signup-password').value)
  };

  return (
    <div id="login-signup-page">
      <div id="login-signup-component" className="shadow-effect">
        <h3>Log In</h3>

        <div>
          <h4>Username</h4>
          <input id="login-username" onChange={usernameChange} required />
        </div>

        <div>
          <h4>Password</h4>
          <input
            id="login-password"
            type="password"
            onChange={passwordChange}
            required
          />
        </div>

        <button className="button-effect button-yellow" onClick={logInClick}>
          Log In
        </button>

        <hr />

        <p>
          Need an account? <a href="/signup">Sign Up</a>
        </p>
      </div>

      {isUsernameEmpty || isPasswordEmpty || isLoginError ? (
        <div id="warning-signup" className="shadow-effect">
          {isUsernameEmpty ? <p>Username is empty.</p> : null}
          {isPasswordEmpty ? <p>Password is empty.</p> : null}
          {isLoginError ? <p>{loginError}</p> : null}
        </div>
      ) : null}

      {isLogin.state ? <Navigate to="/home" /> : null}
    </div>
  );
};

export default LogIn;
