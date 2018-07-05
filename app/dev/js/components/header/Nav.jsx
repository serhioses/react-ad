import React from 'react';
import { NavLink } from 'react-router-dom';

import CreatePhotographLink from './CreatePhotographLink';

import * as routes from '@app-constants/routes';

export default class Nav extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false
    };

    this.toggleNav = this.toggleNav.bind(this);
  }

  toggleNav() {
    this.setState((prevState) => {
      return {
        isOpen: !prevState.isOpen
      }
    });
  }

  render() {
    const { isOpen } = this.state;

    const renderNavIcon = () => {
      if (isOpen) {
        return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon--align_middle" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
        <path d="M0 0h24v24H0z" fill="none"/>
      </svg>;
      }

      return <svg xmlns="http://www.w3.org/2000/svg" className="icon icon--align_middle" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
      </svg>;
    };

    return (
      <React.Fragment>
        <button className={`nav-trigger ${isOpen ? "nav-trigger--active" : ""} hidden-sm`} onClick={this.toggleNav}>
          {renderNavIcon()}
        </button>
        <nav className={`nav ${isOpen ? "nav--active" : ""}`}>
          <NavLink className="nav__link" activeClassName="nav__link--active" exact to={routes.HOME} onClick={this.toggleNav}>Home</NavLink>
          <NavLink className="nav__link" activeClassName="nav__link--active" to={routes.ABOUT} onClick={this.toggleNav}>About</NavLink>
          <CreatePhotographLink toggleNav={this.toggleNav} />
          <NavLink className="nav__link" activeClassName="nav__link--active" to={routes.DASHBOARD} onClick={this.toggleNav}>Dashboard</NavLink>
        </nav>
        <div className={`nav-overlay ${isOpen ? "nav-overlay--active" : ""} hidden-sm`} onClick={this.toggleNav}></div>
      </React.Fragment>
    );
  }
}
