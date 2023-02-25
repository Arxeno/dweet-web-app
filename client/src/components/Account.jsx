import { useContext } from 'react';
import { Link } from 'react-router-dom';
import CONFIG from '../config';
import GlobalStateContext from '../context/GlobalStateContext';

const Account = ({ userName }) => {
  const { userNameLogin, userNameLoginPhoto } = useContext(GlobalStateContext);

  return (
    <Link className="account" to={`/${userName.slice(1)}`}>
      <img
        src={
          userName.slice(1) == userNameLogin.state.slice(1)
            ? userNameLoginPhoto.state
            : `${CONFIG.BACKEND_URL}/photo/${userName.slice(1)}`
        }
      />
      <h3 className="username">{userName}</h3>
    </Link>
  );
};

export default Account;
