import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PhotographCard from './PhotographCard';
import Pagination from '@app-components/Pagination';
import Loading from '@app-components/Loading';

import { startGetPhotographs } from '@app-actions/photograph';
import { search } from '@app-actions/filters';
import { getPhotographs, getPhotographsLoadingState } from '@app-selectors/photograph';
import { getProfile } from '@app-selectors/auth';
import { getFilters, getFilteredPhotographs } from '@app-selectors/filters';
import { PHOTOGRAPHS_PER_PAGE } from '@app-constants/photograph';

export class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      searchText: ''
    };

    this.onPageChange = this.onPageChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.setSearchText = this.setSearchText.bind(this);
  }

  componentDidMount() {
    if (!this.props.loaded) {
      this.props.startGetPhotographs();
    }
  }

  onPageChange(pageNum) {
    this.setState({
      currentPage: pageNum,
    }, () => {
      document.body.scrollIntoView();
    });
  }

  handleSearch(e) {
    e.preventDefault();

    this.props.search(this.state.searchText.toLowerCase());
  }

  setSearchText(e) {
    this.setState({
      searchText: e.target.value,
    });
  }

  render() {
    const { photographs, loaded, profile } = this.props;
    const { currentPage } = this.state;

    const renderPhotographs = () => {
      if (!loaded) {
        return <Loading message="Loading photographs..." />;
      }
      if (!photographs.length) {
        return <div className="default-text">
          <p>No photographs found.</p>
        </div>;
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
          <form onSubmit={this.handleSearch}>
            <input className="form-field" placeholder="Search..." onChange={this.setSearchText} />
            <button type="submit">Find</button>
          </form>
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
    // photographs: getPhotographs(state),
    photographs: getFilteredPhotographs(state),
    loaded: getPhotographsLoadingState(state),
    profile: getProfile(state),
    filters: getFilters(state),
  }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  startGetPhotographs,
  search,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
