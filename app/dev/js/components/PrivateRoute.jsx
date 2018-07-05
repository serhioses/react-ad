import React from 'react';
import {
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';

// components
import Loading from '@app-components/Loading';

import * as routes from '@app-constants/routes';
import { PROFILE_STATE_PENDING } from '@app-constants/auth';
import { getProfile } from '@app-selectors/auth';

const PrivateRoute = ({ component: Component, profile, ...rest }) => {
  return <Route
    {...rest}
    render={(props) => {
      if (profile === PROFILE_STATE_PENDING) {
        return <div className="content">
          <div className="container">
            <Loading message="Please, wait..." />
          </div>
        </div>;
      } else if (profile) {
        return <Component {...props} />;
      }
      
      return <Redirect
        to={{
          pathname: routes.SIGN_IN,
          state: { from: props.location }
        }}
      />;
    }}
  />;
}

const mapStateToProps = (state) => {
  return {
    profile: getProfile(state),
  }
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));
