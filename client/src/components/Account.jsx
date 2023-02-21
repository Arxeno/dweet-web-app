import { Link } from 'react-router-dom';
import CONFIG from '../config';

const Account = ({ imagePhoto, userName }) => {
  console.log(userName.slice(1));

  return (
    <Link className="account" to={`/${userName.slice(1)}`}>
      <img src={`${CONFIG.BACKEND_URL}/photo/${userName.slice(1)}`} />
      <h3 className="username">{userName}</h3>
    </Link>
  );
};

export default Account;
