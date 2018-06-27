import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PhotographCard from './PhotographCard';

import { startGetPhotographs } from '@app-actions/photograph';
import { getPhotographs } from '@app-selectors/photograph';
import { getProfile } from '@app-selectors/auth';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!this.props.photographs) {
      this.props.startGetPhotographs();
    }
  }

  render() {
    const { photographs, profile } = this.props;

    const renderPhotographs = () => {
      if (!photographs) {
        return null;
      }

      return photographs.map((photograph, i) => {
        return <PhotographCard key={i} {...photograph} profileId={profile && profile.uid} />;
      });
    };

    return (
      <div className="content">
        <div className="container">
          <div className="row">
            {renderPhotographs()}
          </div>
        </div>
      </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
    photographs: getPhotographs(state),
    profile: getProfile(state),
  }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  startGetPhotographs,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
