import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as routes from '@app-constants/routes';

export class Loading extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   redirectToReferrer: false
    // };
  }

  render() {
    // const { from } = this.props || '/';

    if (this.props.profile && this.props.profile !== 'pending') {
      console.log(0);
      return <Redirect to={this.props.from || routes.HOME} />
    } else if (!this.props.profile) {
      console.log(1);
      return <Redirect to={routes.HOME} />
    }

    return <div>Loading</div>;
  }
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

export default connect(mapStateToProps)(Loading);
