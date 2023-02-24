import React from 'react';

const Backdrop = ({ handleClickBackdrop }) => {
  return (
    <div id="backdrop" onClick={handleClickBackdrop}>
      Backdrop
    </div>
  );
};

export default Backdrop;
