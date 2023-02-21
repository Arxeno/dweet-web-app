import { Link } from 'react-router-dom';

const Account = ({ imagePhoto, userName }) => {
  return (
    <Link className="account" to={`/${userName.slice(1)}`}>
      <img src={imagePhoto} />
      <h3 className="username">{userName}</h3>
    </Link>
  );
};

export default Account;
