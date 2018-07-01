import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  startGetPhotograph,
  clearCurrentPhotograph,
} from '@app-actions/photograph';
import { getPhotograph } from '@app-selectors/photograph';

export class PhotographView extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.startGetPhotograph(this.props.match.params.id);
  }

  render() {
    const { photograph } = this.props;

    if (!photograph) {
      return null;
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
