import React, { useState } from 'react';
import Backdrop from './Backdrop';

const EditDesc = ({ removeThisComponent, descText, confirmEdit }) => {
  const [textAreaState, setTextAreaState] = useState(descText);

  const textAreaChangeHandler = (event) => {
    setTextAreaState(event.target.value.slice(0, 201));
  };

  return (
    <div id="edit-desc-component">
      <Backdrop handleClickBackdrop={removeThisComponent} />
      <div id="edit-desc-box" className="shadow-effect">
        <h2>
          Edit Description <span className="emoji">✍</span>
        </h2>
        <textarea
          className="tweet-textarea"
          cols="30"
          rows="10"
          value={textAreaState}
          onChange={textAreaChangeHandler}
        ></textarea>
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
          onClick={() => confirmEdit(textAreaState)}
        >
          Confirm Change
        </button>
      </div>
    </div>
  );
};

export default EditDesc;
