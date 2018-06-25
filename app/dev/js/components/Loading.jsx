import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as routes from '@app-constants/routes';
import { PROFILE_STATE_PENDING } from '@app-constants/auth';

const Loading = (props) => {
  return (
    <div className="content">
      <div className="page-loading">{props.message || 'Loading...'}</div>
    </div>
  );
};

export default Loading;

// export class Loading extends React.Component {
//   constructor(props) {
//     super(props);

//     // this.state = {
//     //   redirectToReferrer: false
//     // };
//   }

//   render() {
//     // const { from } = this.props || '/';

//     if (this.props.profile && this.props.profile !== PROFILE_STATE_PENDING) {
//       return <Redirect to={this.props.from || routes.HOME} />
//     } else if (!this.props.profile) {
//       return <Redirect to={routes.HOME} />
//     }

//     return <div>Loading</div>;
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     profile: state.profile,
//   }
// };

// const mapDispatchToProps = (dispatch) => bindActionCreators({
//   startSignIn,
// }, dispatch);

// export default connect(mapStateToProps)(Loading);
