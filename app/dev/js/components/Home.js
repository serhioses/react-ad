import React from 'react';
import { Link } from 'react-router-dom';

import { DASHBOARD } from '@app-constants/routes';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="content content--dumb c-flex c-flex--dir_column">
        <div className="home-page bg-image">
          <div className="home-page__content">
            <h1 className="home-page__title h1">Welcome to the photographs application</h1>
            <Link className="button button--big button--raised button--raised_white" to={DASHBOARD}>Dashboard</Link>
          </div>
        </div>
      </div>
    );
  }
}
