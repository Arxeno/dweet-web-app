import React, { useContext, useState } from 'react';
import Backdrop from './Backdrop';
import CloseFriendAccount from './CloseFriendAccount';
import GlobalStateContext from '../context/GlobalStateContext';
import CONFIG from '../config';

const EditCloseFriends = ({ removeThisComponent }) => {
  const [searchInput, setSearchInput] = useState('');
  const [friends, setFriends] = useState([]);

  const { userNameLogin } = useContext(GlobalStateContext);

  const inputHandlerChange = async (event) => {
    setSearchInput(event.target.value);

    const response = await fetch(
      `${CONFIG.BACKEND_URL}/search?q=${searchInput}`
    );
    const responseJson = await response.json();

    setFriends(responseJson);
  };

  const addCloseFriend = async (name, target) => {
    const body = { name, target };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(`${CONFIG.BACKEND_URL}/closefriends`, options)
    const responseJson = await response.json()
    console.log(responseJson)
  };

  const removeCloseFriend = async (name, target) => {
    const body = {name, target}

    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    };

    const response = await fetch(`${CONFIG.BACKEND_URL}/closefriends`, options);
    const responseJson = await response.json();
    console.log(responseJson);
  };

  return (
    <div id="edit-close-friend-component">
      <Backdrop handleClickBackdrop={removeThisComponent} />
      <div id="edit-close-friend-box" className="shadow-effect">
        <input value={searchInput} onChange={inputHandlerChange} />
        <div id="close-friends">
          {friends.map((data, index) => {
            return (
              <CloseFriendAccount
                key={index}
                userName={data.name}
                add={(target) =>
                  addCloseFriend(userNameLogin.state.slice(1), target)
                }
                remove={(target) =>
                  removeCloseFriend(userNameLogin.state.slice(1), target)
                }
                targetedCloseFriends={data.targetedCloseFriends}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EditCloseFriends;
