import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '@app-components/Loading';

import {
  startGetPhotograph,
  clearCurrentPhotograph,
} from '@app-actions/photograph';
import { getPhotograph } from '@app-selectors/photograph';
import { HOME } from '@app-constants/routes';

export class PhotographView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.startGetPhotograph(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearCurrentPhotograph();
  }

  render() {
    const { photograph } = this.props;

    if (photograph === null) {
      return <div className="content">
        <div className="container">
          <Loading message="Loading photograph..." />
        </div>
      </div>;
    }
    if (photograph === false) {
      return <Redirect to={{
        pathname: HOME
      }} />;
    }

    return (
      <div className="content">
        <div className="container">
          <div className="photograph-view">
            <h1 className="h1">
              {photograph.name}
            </h1>
            <div className="photograph-view__image bg-image">
              <img src={photograph.original} alt="" />
            </div>
            <p className="photograph-view__date">
              Created at: <time>{(new Date(photograph.createdAt)).toLocaleString('en')}</time>
            </p>
            <div className="photograph-view__desc">
              {photograph.desc}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    photograph: getPhotograph(state),
  }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  startGetPhotograph,
  clearCurrentPhotograph,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PhotographView);
