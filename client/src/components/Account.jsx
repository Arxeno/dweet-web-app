import { Link } from 'react-router-dom';
import CONFIG from '../config';
import { useContext } from 'react';
import GlobalStateContext from '../context/GlobalStateContext';

const Account = ({ imagePhoto, userName }) => {
  const { userNameLogin, userNameLoginPhoto } = useContext(GlobalStateContext);

  // console.log(userName.slice(1));
  // console.log(userName, userNameLogin.state);
  // console.log(userName.slice(1) == userNameLogin.state.slice(1));

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
