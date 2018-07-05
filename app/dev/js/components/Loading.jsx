import React from 'react';

const Loading = (props) => {
  return (
    <div className="page-loading">{props.message || 'Loading...'}</div>
  );
};

export default Loading;
