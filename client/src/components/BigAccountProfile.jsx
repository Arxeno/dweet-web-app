import { useContext } from 'react';
import CONFIG from '../config';
import GlobalStateContext from '../context/GlobalStateContext';

const BigAccountProfile = ({ imagePhoto, userName }) => {
  const { userNameLoginPhoto } = useContext(GlobalStateContext);

  return (
    <div id="big-account">
      <img src={userNameLoginPhoto.state} />
      <h3 id="big-username">{userName}</h3>
    </div>
  );
};

export default BigAccountProfile;
