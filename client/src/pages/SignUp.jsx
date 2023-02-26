import { useState } from 'react';
import { Link } from 'react-router-dom';
import CONFIG from '../config.js';

const SignUp = () => {
  const [userNameState, setUserNameState] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(true);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const signUpClick = () => {
    const password = document.querySelector('#signup-password').value;
    const profilePicture =
      document.querySelector('#signup-profilepic').files[0];

    const body = {
      profilePhoto: `${userNameState}.jpg`,
      name: userNameState,
      password: password,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    fetch(`${CONFIG.BACKEND_URL}/register`, options)
      .then((response) => {
        return response.json();
      })
      .then(async (responseJson) => {
        if (responseJson.status == 400) {
          setErrorMessage(responseJson.message);
        } else {
          setErrorMessage('');
          if (profilePic) {
            const data = new FormData();
            data.append('profilepic', profilePic);
            data.append('name', userNameState);

            const options = {
              method: 'POST',
              body: data,
            };

            const response = await fetch(
              `${CONFIG.BACKEND_URL}/upload`,
              options
            );
            const responseJson = await response.json();
            window.location.href = '/login';
          }
        }
      })
      .catch((err) => {
        console.error('This username is already picked!');
      });
  };

  const usernameChange = (event) => {
    setErrorMessage('');
    const inputUserName = event.target.value || '';

    // limit username length to 30 characters
    if (inputUserName.length > 30) {
      inputUserName = inputUserName.slice(0, 21);
    }

    setUserNameState(inputUserName.toLowerCase());

    if (userNameState) {
      setIsUsernameEmpty(false);
    } else {
      setIsUsernameEmpty(true);
    }
  };

  const passwordChange = (event) => {
    setErrorMessage('');

    setPasswordState(event.target.value);

    if (document.querySelector('#signup-password').value) {
      setIsPasswordEmpty(false);
    } else {
      setIsPasswordEmpty(true);
    }
  };

  return (
    <div id="login-signup-page">
      <h1 className="login-signup-title">
        Dweet! <span className="emoji">🦢</span>
      </h1>
      <div id="login-signup-component" className="shadow-effect">
        <h3>Sign Up</h3>

        <div>
          <h4>Username</h4>
          <input
            id="signup-username"
            value={userNameState}
            onChange={usernameChange}
            required
          />
        </div>

        <div>
          <h4>Password</h4>
          <input
            id="signup-password"
            type="password"
            value={passwordState}
            onChange={passwordChange}
            required
          />
        </div>

        <div>
          <h4>Profile Picture</h4>
          <input
            name="profilepic"
            id="signup-profilepic"
            type="file"
            accept=".png, .jpg, .jpeg"
            onChange={(event) => setProfilePic(event.target.files[0])}
          />
        </div>

        <button className="button-effect button-yellow" onClick={signUpClick}>
          Sign Up
        </button>

        <hr />

        <p>
          Already a user? <Link to="/login">Log In</Link>
        </p>
      </div>

      {isUsernameEmpty || isPasswordEmpty || errorMessage ? (
        <div id="warning-signup" className="shadow-effect">
          {isUsernameEmpty ? <p>Username is empty.</p> : null}
          {isPasswordEmpty ? <p>Password is empty.</p> : null}
          {errorMessage ? <p>{errorMessage}</p> : null}
        </div>
      ) : null}
    </div>
  );
};

export default SignUp;
