import React, { useState } from 'react';
import Backdrop from './Backdrop';

const EditTweet = ({ removeThisComponent, tweetText, confirmEdit }) => {
  const [textAreaState, setTextAreaState] = useState(tweetText);

  const textAreaChangeHandler = (event) => {
    setTextAreaState(event.target.value);
  };

  return (
    <div id="edit-tweet-component">
      <Backdrop handleClickBackdrop={removeThisComponent} />
      <div id="edit-tweet-box" className="shadow-effect">
        <h2>
          Edit Tweet <span className="emoji">✍</span>
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

export default EditTweet;
