import React from 'react';

const ModalHeader = (props) => {
  const { title = "Modal" } = props;

  return (
    <header className="modal__header">
      <p className="modal__title">{title}</p>
      <button className="modal__close" type="button" onClick={props.close}>
        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon--align_middle" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </button>
    </header>
  );
};

export default ModalHeader;
