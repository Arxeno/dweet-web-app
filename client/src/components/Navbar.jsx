import { useContext, useState } from 'react';
import { Navigate } from 'react-router-dom';
import Account from './Account';
import GlobalStateContext from '../context/GlobalStateContext';

const Navbar = () => {
  const { userNameLogin, userNameLoginPhoto } = useContext(GlobalStateContext);

  const [goHome, setGoHome] = useState(false);
  const clickHandlerGoHome = () => {
    setGoHome(true);
  };

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
