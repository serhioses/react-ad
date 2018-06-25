import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startSignOut } from '@app-actions/auth';

export class SignOutButton extends React.Component {
  constructor(props) {
    super(props);

    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    this.props.startSignOut();
  }

  render() {
    const { className } = this.props;

    return (
      <button className={className} onClick={this.signOut}>Sign Out</button>
    );
  }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
  startSignOut,
}, dispatch);

export default connect(null, mapDispatchToProps)(SignOutButton);
