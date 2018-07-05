import React from 'react';
import { withRouter, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { PHOTOGRAPH_CREATE } from '@app-constants/routes';

import { clearCurrentPhotograph } from '@app-actions/photograph';

export class CreatePhotographLink extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.toggleNav();
    this.props.clearCurrentPhotograph();
  }

  render() {
    return (
      <NavLink className="nav__link" activeClassName="nav__link--active" to={PHOTOGRAPH_CREATE} onClick={this.handleClick}>Add Photograph</NavLink>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  clearCurrentPhotograph,
}, dispatch);

export default withRouter(connect(null, mapDispatchToProps)(CreatePhotographLink));
