import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '@app-components/Loading';

import {
  startPublishPhotograph,
  startGetPhotograph,
  clearCurrentPhotograph,
  startDeletePhotographFile
} from '@app-actions/photograph';
import { getPhotograph } from '@app-selectors/photograph';

export class ManagePhotograph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      desc: '',
      processing: false,
      showBrowseButton: true,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeFile = this.removeFile.bind(this);
  }

  static crop(file, cb) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = new Image();

      img.onload = function () {
        canvas.width = 640;
        canvas.height = 480;

        const sx = img.naturalWidth / 2 - 640 / 2;
        const sy = img.naturalHeight / 2 - 480 / 2;

        ctx.drawImage(img, sx, sy, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);

        cb(canvas.toDataURL('image/jpeg'));
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  static showPhotoPreview(file, cb) {
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = new Image();

      img.onload = function () {
        cb(img);
      };

      img.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  componentDidMount() {
    if (this.props.match.params.id && !this.props.currentPhotograph) {
      this.props.startGetPhotograph(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentPhotograph) {
      this.refresh(nextProps.currentPhotograph);
    }
  }

  componentWillUnmount() {
    if (this.props.currentPhotograph) {
      this.props.clearCurrentPhotograph(this.props.currentPhotograph.fileName);
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (!this.state.file || !this.state.name || !this.state.desc) {
      this.setState({
        photographError: !this.state.file,
        nameError: !this.state.name,
        descError: !this.state.desc,
      });

      return;
    }

    this.setState({
      processing: true,
    });

    ManagePhotograph.crop(this.state.file, (thumb) => {
      if (this.props.currentPhotograph) {
        this.props.startUpdatePhotograph({
          thumb,
          file: this.state.file,
          name: this.state.name,
          desc: this.state.desc,
          id: this.props.currentPhotograph && this.props.currentPhotograph.id,
          fileToRemove: this.state.fileToRemove,
        });
      } else {
        this.props.startPublishPhotograph({
          thumb,
          file: this.state.file,
          name: this.state.name,
          desc: this.state.desc,
          // isUpdate: !!this.props.currentPhotograph,
          // id: this.props.currentPhotograph && this.props.currentPhotograph.id,
          // fileToRemove: this.state.fileToRemove,
        });
      }
    });
  }

  onFileChange(e) {
    this.setState({
      file: e.target.files[0],
      photographError: false,
    });

    ManagePhotograph.showPhotoPreview(e.target.files[0], (img) => {
      this.setState({
        bg: img.src
      });
    });
  }

  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      [e.target.name + 'Error']: !e.target.value,
    });
  }

  refresh(photograph) {
    this.setState({
      name: photograph.name,
      desc: photograph.desc,
      bg: photograph.original,
      processing: false,
      showBrowseButton: !photograph.original,
      file: !!photograph.original,
    });
  }

  removeFile() {
    this.setState({
      file: null,
      bg: null,
      showBrowseButton: true,
      fileToRemove: this.props.currentPhotograph.fileName,
    });
    // this.props.startDeletePhotographFile(this.props.currentPhotograph.fileName);
    // console.log(this.props.currentPhotograph.fileName);
  }

  render() {
    // delete on submit
    // separate publish from update
    const { currentPhotograph, match } = this.props;

    if (match.params.id && !currentPhotograph) {
      return <Loading message="Loading data..." />;
    }

    const renderBrowseFile = () => {
      return !this.state.showBrowseButton ?
        null :
        <div className="form-group c-text-center">
          <input id="file" className="input-hidden" type="file" name="photograph" accept="image/*" onChange={this.onFileChange} />
          <label className="button button--default button--raised button--raised_medium-gray" htmlFor="file">Browse a photograph</label>
          {this.state.photographError ? <p className="form-error">Please, browse a photograph.</p> : null}
        </div>;
    };

    const renderRemoveFile = () => {
      return this.state.showBrowseButton ?
        null :
        <button className="photograph__remove" type="button" onClick={this.removeFile}>
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon--align_middle" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path fill="none" d="M0 0h24v24H0V0z"/>
            <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/>
            <path fill="none" d="M0 0h24v24H0z"/>
          </svg>
        </button>
    };

    return (
      <div className="content">
        <div className="container">
          <div className="photograph">
            <div className="photograph__preview bg-image" style={{backgroundImage: `url("${this.state.bg}")`}}>
              {renderRemoveFile()}
            </div>
            <form onSubmit={this.handleSubmit} autoComplete="false">
              <div className="photograph__form">
                {renderBrowseFile()}
                <div className="form-group">
                  <input className="form-field" type="text" name="name" defaultValue={this.state.name} placeholder="Name" autoComplete="false" onChange={this.onInputChange} />
                  {this.state.nameError ? <p className="form-error">Please, enter a photograph name.</p> : null}
                </div>
                <div className="form-group">
                  <textarea className="form-group__area form-field" name="desc" defaultValue={this.state.desc} placeholder="Desc" autoComplete="false" onChange={this.onInputChange}></textarea>
                  {this.state.descError ? <p className="form-error">Please, enter a photograph description.</p> : null}
                </div>
                <div className="form-group c-text-center">
                  <button className={`button button--big button--raised button--raised_indigo ${this.state.processing ? "button--state_loading" : null}`} type="submit" disabled={this.state.processing}>
                    {currentPhotograph ? "Upadte" : "Publish"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentPhotograph: getPhotograph(state),
  }
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  startPublishPhotograph,
  startGetPhotograph,
  clearCurrentPhotograph,
  startDeletePhotographFile,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManagePhotograph));
