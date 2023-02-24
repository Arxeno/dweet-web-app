import { useContext, useEffect, useState } from 'react'; //{useContext, useState} from 'react'
import UserNameContext from '../context/UserNameContext';
import Account from './Account';
import GlobalStateContext from '../context/GlobalStateContext';
import { Navigate } from 'react-router-dom';
import CONFIG from '../config';

const Navbar = () => {
  // const {userName, setUserName} = useContext(UserNameContext)\
  const { userNameLogin, userNameLoginPhoto } = useContext(GlobalStateContext);
  // console.log(`NAMA ${userNameLogin.state}`);

  const [goHome, setGoHome] = useState(false);
  // console.log(`gohome -> ${goHome}`);
  const clickHandlerGoHome = () => {
    setGoHome(true);
  };

  // useEffect(() => {
  //   userNameLoginPhoto.setState(
  //     `${CONFIG.BACKEND_URL}/photo/${userNameLogin.state.slice(1)}`
  //   );
  //   console.log(userNameLoginPhoto.state);
  // }, []);

  return (
    <nav id="header-nav">
      <a id="nav-title" onClick={clickHandlerGoHome}>
        <h1>
          <span className="emoji">🦢</span> Dweet
        </h1>
      </a>

      <button id="hamburger-menu__button" className="button-effect">
        <img src="images/hamburger-menu.svg" alt="Hamburger menu" />
      </button>
      <Account
        imagePhoto={userNameLoginPhoto.state}
        userName={userNameLogin.state || 'Log In'}
      />
      {goHome ? <Navigate to="/home" /> : null}
    </nav>
  );
};

export default Navbar;
