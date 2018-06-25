import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getPhotographs } from '@app-selectors/photograph';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { photographs } = this.props;

    const renderPhotographs = () => {
      return photographs.map((photograph, i) => {
        return <div key={i}>
          <img src={photograph.thumb} alt="" />
          <p>{photograph.name}</p>
          <p>{photograph.desc}</p>
        </div>;
      });
    };

    return (
      renderPhotographs()
    );
  };
}

const mapStateToProps = (state) => {
  return {
    photographs: getPhotographs(state),
  }
};

// const mapDispatchToProps = (dispatch) => bindActionCreators({
//   startPublishPhotograph,
// }, dispatch);

export default connect(mapStateToProps)(Dashboard);
