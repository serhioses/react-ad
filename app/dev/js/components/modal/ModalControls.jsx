import React from 'react';

const ModalControls = (props) => {
  const clonedChildren = React.Children.map(props.children, (child, index) => {
    return React.cloneElement(child, {
      open: props.open,
      close: props.close,
    });
  });

  return (
    <div className="modal__controls c-text-right">
      {clonedChildren}
    </div>
  );
};

export default ModalControls;
