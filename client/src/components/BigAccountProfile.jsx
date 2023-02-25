import { useContext } from 'react';
import GlobalStateContext from '../context/GlobalStateContext';

const BigAccountProfile = ({ userName }) => {
  const { userNameLoginPhoto } = useContext(GlobalStateContext);

  return (
    <div id="big-account">
      <img src={userNameLoginPhoto.state} />
      <h3 id="big-username">{userName}</h3>
    </div>
  );
};

export default BigAccountProfile;
