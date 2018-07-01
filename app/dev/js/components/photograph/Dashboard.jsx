import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PhotographCard from './PhotographCard';
import Pagination from '@app-components/Pagination';

import { startGetPhotographs } from '@app-actions/photograph';
import { getPhotographs } from '@app-selectors/photograph';
import { getProfile } from '@app-selectors/auth';
import { PHOTOGRAPHS_PER_PAGE } from '@app-constants/photograph';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
    };

    this.onPageChange = this.onPageChange.bind(this);
  }

  componentDidMount() {
    if (!this.props.photographs) {
      this.props.startGetPhotographs();
    }
  }

  onPageChange(pageNum) {
    this.setState({
      currentPage: pageNum,
    }, () => {
      document.getElementById('photographs').scrollIntoView();
    });
  }

  render() {
    const { photographs, profile } = this.props;
    const { currentPage } = this.state;

    const renderPhotographs = () => {
      if (!photographs) {
        return null;
      }

      return photographs
        .slice(PHOTOGRAPHS_PER_PAGE * currentPage, PHOTOGRAPHS_PER_PAGE * currentPage + PHOTOGRAPHS_PER_PAGE)
          .map((photograph, i) => {
            return <PhotographCard key={i} {...photograph} profileId={profile && profile.uid} />;
          });
    };

    return (
      <div className="content">
        <div id="photographs" className="container">
          <div className="row">
            {renderPhotographs()}
          </div>
          {!photographs || photographs.length <= PHOTOGRAPHS_PER_PAGE ? null : <Pagination totalPages={Math.ceil(photographs.length / PHOTOGRAPHS_PER_PAGE)} onChange={this.onPageChange} />}
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
