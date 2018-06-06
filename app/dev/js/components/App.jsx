import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect
} from 'react-router-dom';

import Nav from '@app-components/Nav';
import LandingPage from '@app-components/Landing';
import SignUpPage from '@app-components/SignUp';
// import SignInPage from '@app-components/SignIn';
import PasswordForgetPage from '@app-components/PasswordForget';
import HomePage from '@app-components/Home';
import AccountPage from '@app-components/Account';

import * as routes from '@app-constants/routes';

import { firebase } from '../firebase';
console.log(firebase);

const fakeAuth = {
  isAuthenticated: 'pending',
  authenticate(cb) {
    // this.isAuthenticated = true;
    // setTimeout(cb, 100); // fake async
    firebase.auth.signInWithPopup(firebase.provider).then((result) => {
      this.isAuthenticated = true;
      cb && cb();
    });
  },
  signout(cb) {
    firebase.auth.signOut().then(() => {
      this.isAuthenticated = false;
      cb && cb();
      console.log('Sign-out successful.');
      // Sign-out successful.
    }).catch((error) => {
      console.log(error);
      // An error happened.
    });
    // this.isAuthenticated = false;
    // setTimeout(cb, 100);
  }
};
firebase.auth.onAuthStateChanged((user) => {
  fakeAuth.isAuthenticated = !!user;
});

const PrivateRoute = ({ component: Component, ...rest }) => {
  return <Route
    {...rest}
    render={(props) => {
      if (fakeAuth.isAuthenticated === true) {
        return <Component {...props} />;
      } else if (fakeAuth.isAuthenticated === 'pending') {
        return <Loading from={props.location} />
      }

      return <Redirect
        to={{
          pathname: routes.SIGN_IN,
          state: { from: props.location }
        }}
      />;
    }}
  />;
};

class Loading extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false
    };
  }

  render() {
    return <div>Loading</div>;
  }
}

class SignInPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false
    }

    console.log(this.props);
  }

  componentDidMount() {
    fakeAuth.authenticate(() => {
      if (fakeAuth.isAuthenticated) {
        this.setState({
          redirectToReferrer: true
        });
      }
    });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return <div>Sign in Page</div>;
  }
}

class SignOutPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fakeAuth.signout();
  }

  render() {
    return <div>Sign out Page</div>;
  }
}


const App = () => {
  return <Router>
    <div>
      <Nav />

      <hr/>

      <Route
        exact path={routes.LANDING}
        component={LandingPage}
      />
      <Route
        exact path={routes.SIGN_UP}
        component={SignUpPage}
      />
      <Route
        exact path={routes.SIGN_IN}
        component={SignInPage}
      />
      <Route
        exact path={routes.PASSWORD_FORGET}
        component={PasswordForgetPage}
      />
      <Route
        exact path={routes.HOME}
        component={HomePage}
      />
      <Route
        exact path='/signout'
        component={SignOutPage}
      />
      <PrivateRoute exact path={routes.ACCOUNT}
        component={AccountPage} />
    </div>
  </Router>;
};

export default App;
