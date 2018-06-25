import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startPublishPhotograph } from '@app-actions/photograph';

export class ManagePhotograph extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      processing: false,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      this.props.startPublishPhotograph({
        thumb,
        file: this.state.file,
        name: this.state.name,
        desc: this.state.desc,
      });
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

  render() {
    return (
      <div className="content">
        <div className="container">
          <div className="photograph">
            <div className="photograph__preview bg-image" style={{backgroundImage: `url("${this.state.bg}")`}}></div>
            <form onSubmit={this.handleSubmit} autoComplete="false">
              <div className="photograph__form">
                <div className="form-group c-text-center">
                  <input id="file" className="input-hidden" type="file" name="photograph" accept="image/*" onChange={this.onFileChange} />
                  <label className="button button--default button--raised button--raised_medium-gray" htmlFor="file">Browse a photograph</label>
                  {this.state.photographError ? <p className="form-error">Please, browse a photograph.</p> : null}
                </div>
                <div className="form-group">
                  <input className="form-field" type="text" name="name" placeholder="Name" autoComplete="false" onChange={this.onInputChange} />
                  {this.state.nameError ? <p className="form-error">Please, enter a photograph name.</p> : null}
                </div>
                <div className="form-group">
                  <textarea className="form-group__area form-field" name="desc" placeholder="Desc" autoComplete="false" onChange={this.onInputChange}></textarea>
                  {this.state.descError ? <p className="form-error">Please, enter a photograph description.</p> : null}
                </div>
                <div className="form-group c-text-center">
                  <button className={`button button--big button--raised button--raised_indigo ${this.state.processing ? "button--state_loading" : null}`} type="submit" disabled={this.state.processing}>Publish</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
    
//   }
// };

const mapDispatchToProps = (dispatch) => bindActionCreators({
  startPublishPhotograph,
}, dispatch);

export default connect(null, mapDispatchToProps)(ManagePhotograph);
