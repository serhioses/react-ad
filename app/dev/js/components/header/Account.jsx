import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import SignOutButton from '@app-components/auth/SignOutButton';

import { getProfile } from '@app-selectors/auth';
import * as routes from '@app-constants/routes';

export class Account extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { profile } = this.props;

    const renderAccount = () => {
      if (profile === null) {
        return <Link className="account__link" to={routes.SIGN_IN}>Sign In</Link>;
      } else if (profile && profile.email) {
        return <React.Fragment>
          <div className="account__inner c-flex c-flex--ai_center">
            <div className="account__photo bg-image" style={{ backgroundImage: `url("${profile.photoURL}")` }}></div>
            <SignOutButton className="account__link" />
          </div>
        </React.Fragment>;
      }

      return null;
    };

    return (
      <div className="account">
        {renderAccount()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: getProfile(state),
  }
};

export default connect(mapStateToProps)(Account);
