import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Nav from '@app-components/Nav';
import LandingPage from '@app-components/Landing';
import SignUpPage from '@app-components/SignUp';
import SignInPage from '@app-components/SignIn';
import PasswordForgetPage from '@app-components/PasswordForget';
import HomePage from '@app-components/Home';
import AccountPage from '@app-components/Account';

import * as routes from '@app-constants/routes';

const App = () => {
  return <Router>
    <div>
      <Nav />

      <hr/>

      <Route
        exact path={routes.LANDING}
        component={() => <LandingPage />}
      />
      <Route
        exact path={routes.SIGN_UP}
        component={() => <SignUpPage />}
      />
      <Route
        exact path={routes.SIGN_IN}
        component={() => <SignInPage />}
      />
      <Route
        exact path={routes.PASSWORD_FORGET}
        component={() => <PasswordForgetPage />}
      />
      <Route
        exact path={routes.HOME}
        component={() => <HomePage />}
      />
      <Route
        exact path={routes.ACCOUNT}
        component={() => <AccountPage />}
      />
    </div>
  </Router>;
};

export default App;
