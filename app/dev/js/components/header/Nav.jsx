import React from 'react';
import { Link } from 'react-router-dom';



import * as routes from '@app-constants/routes';

const Nav = () =>
  <nav className="nav">
    <div className="nav__left">
      <Link className="nav__link" to={routes.SIGN_IN}>Sign In</Link>
      <Link className="nav__link" to={routes.HOME}>Home</Link>
      <Link className="nav__link" to={routes.PHOTOGRAPH_MANAGE}>Photograph</Link>
      <Link className="nav__link" to={routes.SIGN_OUT}>Sign Out</Link>
    </div>
  </nav>;

export default Nav;
