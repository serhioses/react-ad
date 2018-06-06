import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '@app-constants/routes';

const Nav = () =>
  <div>
    <ul>
      <li><Link to={routes.SIGN_IN}>Sign In</Link></li>
      <li><Link to={routes.SIGN_UP}>Sign Up</Link></li>
      <li><Link to={routes.LANDING}>Landing</Link></li>
      <li><Link to={routes.HOME}>Home</Link></li>
      <li><Link to={routes.ACCOUNT}>Account</Link></li>
      <li><Link to="signout">Sign Out</Link></li>
    </ul>
  </div>;

export default Nav;
