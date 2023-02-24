import React, { useContext, useState } from 'react';
import Backdrop from './Backdrop';
import CONFIG from '../config';
import GlobalStateContext from '../context/GlobalStateContext';

const EditProfilePic = ({ removeThisComponent }) => {
  const [isProfilePicEmpty, setIsProfilePicEmpty] = useState(true);
  const [profilePicture, setProfilePicture] = useState(null);

  const { userNameLogin, userNameLoginPhoto } = useContext(GlobalStateContext);

  const profilePictureChange = (event) => {
    if (event.target.files[0]) {
      setIsProfilePicEmpty(false);

      // const fileReader = new FileReader();
      // fileReader.readAsDataURL(event.target.files[0]);

      // fileReader.onload = () => {
      //   setProfilePicture({
      //     profilePic: fileReader.result,
      //     name: userNameLogin.state,
      //   });
      // };

      setProfilePicture(event.target.files[0]);
      console.log(event.target.files[0]);
    } else {
      setIsProfilePicEmpty(true);
    }
  };

  const confirmButtonHandlerClick = async () => {
    if (!isProfilePicEmpty) {
      // alert('yea');
      await postImage();
    }
    // } else {
    // alert('no');
    // }
  };

  const postImage = async () => {
    const data = new FormData();
    data.append('profilepic', profilePicture);
    data.append('name', userNameLogin.state.slice(1));

    console.log('DATA');
    console.log(data);

    const options = {
      method: 'POST',
      body: data,
    };

    fetch(`${CONFIG.BACKEND_URL}/upload`, options)
      .then((response) => response.json())
      .then((reponseJson) => console.log(reponseJson))
      .catch((error) => console.log(error));

    userNameLoginPhoto.setState(URL.createObjectURL(profilePicture));
    removeThisComponent();
  };

  console.log('TES EDIT PROFILE PIC');
  console.log(userNameLogin.state.slice(1));

  return (
    <div id="edit-profpic-component">
      <Backdrop handleClickBackdrop={removeThisComponent} />

      <div id="edit-profpic-box" className="shadow-effect">
        <h2>
          Edit Description <span className="emoji">😎</span>
        </h2>

        <img
          id="image-preview"
          src={
            profilePicture
              ? URL.createObjectURL(profilePicture)
              : `${CONFIG.BACKEND_URL}/photo/${userNameLogin.state.slice(1)}`
          }
        />

        <input
          name="profilePic"
          id="change-profilepic"
          type="file"
          accept=".png, .jpg, .jpeg"
          onChange={profilePictureChange}
        />
        <button
          id="cancel-edit"
          className="button-effect button-yellow"
          onClick={removeThisComponent}
        >
          Cancel
        </button>
        <button
          id="confirm-edit"
          className="button-effect button-yellow"
          onClick={confirmButtonHandlerClick}
        >
          Confirm Change
        </button>

        {isProfilePicEmpty ? (
          <div id="warning-edit-profilepic" className="shadow-effect">
            {isProfilePicEmpty ? <p>Please upload a file.</p> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default EditProfilePic;
