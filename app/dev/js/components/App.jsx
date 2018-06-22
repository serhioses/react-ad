import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';

// components
import Header from '@app-components/header/Header';
import SignInPage from '@app-components/auth/SignIn';
import SignOut from '@app-components/auth/SignOut';
import HomePage from '@app-components/Home';
import ManagePhotograph from '@app-components/photograph/ManagePhotograph';
import PrivateRoute from '@app-components/PrivateRoute';
import Loading from '@app-components/Loading';

import * as routes from '@app-constants/routes';
import * as actions from '@app-actions';
import { firebase } from '@app-firebase';
import configureStore from '@app-store';

let store = configureStore();
store.subscribe(() => {
  let state = store.getState();

  console.log(state);
});
store.dispatch(actions.startAuthStateChange());

const App = () => {
  return <Provider store={store}>
    <Router>
      <div>
        <Header />

        <hr/>

        <Route
          exact path={routes.SIGN_IN}
          component={SignInPage}
        />
        <Route
          exact path={routes.HOME}
          component={HomePage}
        />
        <Route
          exact path={routes.SIGN_OUT}
          component={SignOut}
        />
        <PrivateRoute exact path={routes.PHOTOGRAPH_MANAGE}
          component={ManagePhotograph} />
      </div>
    </Router>
  </Provider>;
};

export default App;
