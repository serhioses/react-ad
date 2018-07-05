import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Loading from '@app-components/Loading';
import ConfirmRemoveModal from './ConfirmRemoveModal';

import {
  startPublishPhotograph,
  startGetPhotograph,
  clearCurrentPhotograph,
  startUpdatePhotograph,
  startRemovePhotograph
} from '@app-actions/photograph';
import { getPhotograph } from '@app-selectors/photograph';
import { PHOTOGRAPH_THUMB_WIDTH } from '@app-constants/photograph';
import { HOME, PHOTOGRAPH_CREATE } from '@app-constants/routes';

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
    this.showModal = this.showModal.bind(this);
    this.cancel = this.cancel.bind(this);
    this.confirm = this.confirm.bind(this);
  }

  static crop(file, cb) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const reader = new FileReader();

    reader.onload = function (e) {
      const img = new Image();

      img.onload = function () {
        canvas.width = PHOTOGRAPH_THUMB_WIDTH;
        canvas.height = PHOTOGRAPH_THUMB_WIDTH / (this.naturalWidth / this.naturalHeight);

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

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
    if ((nextProps.currentPhotograph && !this.props.currentPhotograph)) {
      this.refresh(nextProps.currentPhotograph);
    }
    if (!nextProps.currentPhotograph && nextProps.match.params.id && !this.props.currentPhotograph) {
      this.props.startGetPhotograph(nextProps.match.params.id);
    }
    if (nextProps.match.path === PHOTOGRAPH_CREATE && !nextProps.currentPhotograph && this.props.currentPhotograph) {
      this.refresh();
    }
  }

  componentWillUnmount() {
    if (this.props.currentPhotograph) {
      this.props.clearCurrentPhotograph();
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

    if (this.props.currentPhotograph) {
      if (this.state.fileToRemove) {
        ManagePhotograph.crop(this.state.file, (thumb) => {
          this.props.startUpdatePhotograph({
            thumb,
            file: this.state.file,
            name: this.state.name,
            desc: this.state.desc,
            id: this.props.currentPhotograph.id,
            fileToRemove: this.state.fileToRemove,
          }).then(() => {
            this.setState({
              processing: false,
            });
          });
        });
      } else {
        this.props.startUpdatePhotograph({
          name: this.state.name,
          desc: this.state.desc,
          id: this.props.currentPhotograph.id,
        }).then(() => {
          this.setState({
            processing: false,
          });
        });
      }
    } else {
      ManagePhotograph.crop(this.state.file, (thumb) => {
        this.props.startPublishPhotograph({
          thumb,
          file: this.state.file,
          name: this.state.name,
          desc: this.state.desc,
        });
      });
    }
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
    if (photograph) {
      this.setState({
        name: photograph.name,
        desc: photograph.desc,
        bg: photograph.original,
        processing: false,
        showBrowseButton: !photograph.original,
        file: !!photograph.original,
      });
    } else {
      this.setState({
        name: '',
        desc: '',
        bg: null,
        processing: false,
        showBrowseButton: true,
        file: null,
      });
    }
  }

  removeFile() {
    this.setState({
      file: null,
      bg: null,
      showBrowseButton: true,
      fileToRemove: this.props.currentPhotograph.fileName,
    });
  }

  showModal() {
    this.setState({
      showConfirmRemoveModal: true,
    });
  }

  cancel() {
    this.setState({
      showConfirmRemoveModal: false,
    });
  }

  confirm() {
    this.setState({
      showConfirmRemoveModal: false,
      processing: true,
    });

    this.props.startRemovePhotograph(this.props.currentPhotograph.id, this.props.currentPhotograph.fileName).then(() => {
      this.refresh();
    });
  }

  render() {
    const { currentPhotograph, match } = this.props;

    if (match.params.id && currentPhotograph === null) {
      return <div className="content">
        <div className="container">
          <Loading message="Loading data..." />
        </div>
      </div>;
    }
    if (currentPhotograph === false) {
      return <Redirect to={{
        pathname: HOME
      }} />;
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

    const renderRemovePhotograph = () => {
      return !currentPhotograph ?
        null :
        <button className={`photograph__remove-btn button button--default button--flat button--flat_red ${this.state.processing ? "button--state_loading" : null}`} type="button" disabled={this.state.processing} onClick={this.showModal}>
          Remove photograph
        </button>;
    }

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
                  <input className="form-field" type="text" name="name" value={this.state.name} placeholder="Name" autoComplete="false" onChange={this.onInputChange} />
                  {this.state.nameError ? <p className="form-error">Please, enter a photograph name.</p> : null}
                </div>
                <div className="form-group">
                  <textarea className="form-group__area form-field" name="desc" value={this.state.desc} placeholder="Desc" autoComplete="false" onChange={this.onInputChange}></textarea>
                  {this.state.descError ? <p className="form-error">Please, enter a photograph description.</p> : null}
                </div>
                <div className="form-group c-text-center">
                  <button className={`button button--default button--raised button--raised_indigo ${this.state.processing ? "button--state_loading" : null}`} type="submit" disabled={this.state.processing}>
                      {currentPhotograph ? "Upadte" : "Publish"}
                  </button>
                  {renderRemovePhotograph()}
                </div>
              </div>
            </form>
          </div>
        </div>
        <ConfirmRemoveModal isOpen={this.state.showConfirmRemoveModal} onClose={this.cancel} onConfirm={this.confirm} />
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
  startUpdatePhotograph,
  startRemovePhotograph,
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ManagePhotograph));
