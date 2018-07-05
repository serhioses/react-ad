import React from 'react';
import {
  Route,
  Redirect,
  withRouter,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// components
import Loading from '@app-components/Loading';

import * as routes from '@app-constants/routes';
import { PROFILE_STATE_PENDING } from '@app-constants/auth';

const PrivateRoute = ({ component: Component, profile, ...rest }) => {
  return <Route
    {...rest}
    render={(props) => {
      if (profile === PROFILE_STATE_PENDING) {
        // return <Loading from={props.location} />;
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

// export default PrivateRoute;

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
};

export default withRouter(connect(mapStateToProps)(PrivateRoute));
