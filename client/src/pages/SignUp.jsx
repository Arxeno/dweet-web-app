import { useState } from 'react';
import CONFIG from '../config.js';
import { Link } from 'react-router-dom';

const SignUp = () => {
  const [userNameState, setUserNameState] = useState('');
  const [passwordState, setPasswordState] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [isUsernameEmpty, setIsUsernameEmpty] = useState(true);
  const [isPasswordEmpty, setIsPasswordEmpty] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  // const [isProfilePicEmpty, setIsProfilePicEmpty] = useState(true);

  const signUpClick = () => {
    const password = document.querySelector('#signup-password').value;
    const profilePicture =
      document.querySelector('#signup-profilepic').files[0];

    console.log(userNameState);
    // console.log(typeof userNameState)
    console.log(password);
    // console.log(typeof password)
    console.log(profilePicture);
    // console.log(typeof profilePicture)

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
        // console.log('response');
        // console.log(response);

        // if (response.status == 400) {
        //   setErrorMessage('This username is already picked!');
        // } else {
        //   setErrorMessage('');
        // alert('Sign Up Success')
        //   window.location.href = `/login`;
        // }
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
            console.log(responseJson);
            window.location.href = '/login';
          }
        }
      })
      .catch((err) => {
        console.error('This username is already picked!');
      });

    // console.log('halo')
    // fetch(`${CONFIG.BACKEND_URL}/tweet`, { method: 'GET' })
    // 	.then(response => response.json())
    // 	.then(responseJson => console.log(responseJson))
    // 	.catch(err => console.error(err))
  };

  const usernameChange = (event) => {
    setErrorMessage('');
    const inputUserName = event.target.value || '';
    // console.log('event target value', event.target.value);
    // console.log('inputUserName', inputUserName);

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

    // console.log(document.querySelector('#signup-password').value)
  };

  // const profilePictureChange = () => {
  //   if (document.querySelector('#signup-profilepic').files[0]) {
  //     setIsProfilePicEmpty(false);
  //   } else {
  //     setIsProfilePicEmpty(true);
  //   }
  // };

  return (
    <div id="login-signup-page">
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
