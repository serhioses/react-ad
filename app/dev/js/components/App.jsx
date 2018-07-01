import React from 'react';
import {
  Router,
  Route,
  Redirect
} from 'react-router-dom';
import { Provider } from 'react-redux';

import history from '@app-history';

// components
import Header from '@app-components/header/Header';
import Footer from '@app-components/footer/Footer';
import SignInPage from '@app-components/auth/SignIn';
import SignOut from '@app-components/auth/SignOut';
import HomePage from '@app-components/Home';
import ManagePhotograph from '@app-components/photograph/ManagePhotograph';
import PhotographView from '@app-components/photograph/PhotographView';
import Dashboard from '@app-components/photograph/Dashboard';
import PrivateRoute from '@app-components/PrivateRoute';
import Loading from '@app-components/Loading';

import * as routes from '@app-constants/routes';
import { startAuthStateChange } from '@app-actions/auth';
import { startGetPhotographs } from '@app-actions/photograph';
import { firebase } from '@app-firebase';
import configureStore from '@app-store';

let store = configureStore();
store.subscribe(() => {
  let state = store.getState();

  console.log(state);
});
store.dispatch(startAuthStateChange());
// store.dispatch(startGetPhotographs());

const App = () => {
  return <Provider store={store}>
    <Router history={history}>
      <div className="wrapper">
        <Header />
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
        <PrivateRoute exact path={routes.PHOTOGRAPH_CREATE}
          component={ManagePhotograph} />
        <PrivateRoute exact path={`${routes.PHOTOGRAPH_EDIT}/:id`}
          component={ManagePhotograph} />
          <PrivateRoute exact path={`${routes.PHOTOGRAPH_VIEW}/:id`}
          component={PhotographView} />
        <Route
          exact path={routes.DASHBOARD}
          component={Dashboard}
        />
        <Footer />
      </div>
    </Router>
  </Provider>;
};

export default App;
