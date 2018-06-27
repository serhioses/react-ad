import React from 'react';

const ModalFooter = (props) => {
  const { title } = props;

  return (
    <footer className="modal__footer">
      {props.children}
    </footer>
  );
};

export default ModalFooter;
