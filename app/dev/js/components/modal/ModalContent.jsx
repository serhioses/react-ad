import React from 'react';

const ModalContent = (props) => {
  const { title } = props;

  return (
    <div className="modal__content">
      {props.children}
    </div>
  );
};

export default ModalContent;
