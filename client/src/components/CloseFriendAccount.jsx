import React, { useContext } from 'react';
import GlobalStateContext from '../context/GlobalStateContext';
import CONFIG from '../config';

const CloseFriendAccount = ({ userName, add, remove, targetedCloseFriends }) => {
  const { userNameLogin, userNameLoginPhoto } = useContext(GlobalStateContext);

  return (
    <div id={`${userName}-account`} className="account">
      <img
        src={
          userName == userNameLogin.state.slice(1)
            ? userNameLoginPhoto.state
            : `${CONFIG.BACKEND_URL}/photo/${userName}`
        }
      />
      <h3 className="username">{userName}</h3>
      <button
        id={`${userName}-add`}
        className="add-close-friend button-effect"
        onClick={() => add(userName)}
      >
        Add
      </button>
      <button
        id={`${userName}-remove`}
        className="remove-close-friend button-effect"
        onClick={() => remove(userName)}
      >
        Remove
      </button>
    </div>
  );
};

export default CloseFriendAccount;
