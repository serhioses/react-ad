import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startSignOut } from '@app-actions';

export class SignOut extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.startSignOut();
  }

  render() {
    return null;
  };
}

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  startSignOut,
}, dispatch);

export default connect(null, mapDispatchToProps)(SignOut);
