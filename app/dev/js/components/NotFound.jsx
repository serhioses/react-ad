import React from 'react';
import { Link } from 'react-router-dom';

import { HOME } from '@app-constants/routes';

const NotFound = () => {
  return (
    <div className="content">
      <div className="container">
        <h1 className="h1">Page not found</h1>
        <div className="default-text">
          <p>
            <Link to={HOME}>Go to home page</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
