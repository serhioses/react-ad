import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { startPublishPhotograph } from '@app-actions';

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
      return;
    }

    this.setState({
      processing: true,
    });

    CreatePhotograph.crop(this.state.file, (thumb) => {
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
    });
  }

  onInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });

    CreatePhotograph.showPhotoPreview(e.target.files[0], (img) => {
      this.setState({
        bg: img.src
      });
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="bg-image" style={{backgroundImage: this.state.bg}}></div>
          <p>
            <input type="file" name="photograph" accept="image/*" onChange={this.onFileChange} />
          </p>
          <p>
            <input type="text" name="name" placeholder="Name" onChange={this.onInputChange} />
          </p>
          <p>
            <textarea name="desc" placeholder="Desc" onChange={this.onInputChange}></textarea>
          </p>
          <p>
            <button className={`${this.state.processing ? "loading" : null}`} type="submit">Create</button>
          </p>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
    
//   }
// };

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  startPublishPhotograph,
}, dispatch);

export default connect(null, mapDispatchToProps)(ManagePhotograph);
