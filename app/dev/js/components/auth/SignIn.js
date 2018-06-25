import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startSignIn } from '@app-actions/auth';
import { getProfile } from '@app-selectors/auth';
import { getRefferer } from '@app-selectors';
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
    if (this.props.profile && this.props.profile.email) {
      return <Redirect to={this.props.refferer} />;
    }

    return (
      <div className="content c-flex c-flex--ai_center">
        <div className="auth text-center">
          <button className="button button--default button--raised button--raised_indigo" type="button" onClick={this.signIn}>SIGN IN WITH GITHUB</button>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    profile: getProfile(state),
    refferer: getRefferer(state),
  }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  startSignIn,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
