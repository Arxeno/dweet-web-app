import CONFIG from '../config';

const BigAccountProfile = ({ imagePhoto, userName }) => {
  return (
    <div id="big-account">
      <img src={`${CONFIG.BACKEND_URL}/photo/${userName}`} />
      <h3 id="big-username">{userName}</h3>
    </div>
  );
};

export default BigAccountProfile;
