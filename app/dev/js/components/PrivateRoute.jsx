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

const PrivateRoute = ({ component: Component, profile, ...rest }) => {
  // let profile = store.getState().profile;
  console.log('private route render');
  return <Route
    {...rest}
    render={(props) => {
      if (profile === 'pending') {
        // return <Loading from={props.location} />
        return <div>Loading a;fsdf</div>;
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
