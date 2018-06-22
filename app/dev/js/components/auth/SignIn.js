import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startSignIn } from '@app-actions';
import { HOME } from '@app-constants/routes';

export class SignInPage extends React.Component {
  constructor(props) {
    super(props);

    this.signIn = this.signIn.bind(this);
  }

  signIn() {
    const from = this.props.location.state && this.props.location.state.from && this.props.location.state.from.pathname || HOME;
    this.props.startSignIn(from);
  }

  render() {
    if (this.props.profile) {
      return <Redirect to={this.props.refferer} />;
    }

    return (
      <div>
        <button type="button" onClick={this.signIn}>SIGN IN WITH GITHUB</button>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    refferer: state.refferer,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  startSignIn,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
