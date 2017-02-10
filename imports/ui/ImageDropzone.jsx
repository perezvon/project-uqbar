import React, { Component } from 'react'
import Dropzone from 'react-dropzone'

export default class ImageDropzone extends Component {
	state = {
		files: []
	}
	
    onDrop = (files) => {
      this.setState({
        files: files
      });
    }

    onOpenClick = () => {
      this.refs.dropzone.open();
    }

    render () {
		const falseyVal = false;
      return (
          <div>
            <Dropzone ref="dropzone" onDrop={this.onDrop} accept='image/*' multiple={falseyVal}>
              <div>drag an image file here, or click to select a file to upload.</div>
            </Dropzone>
            {this.state.files && this.state.files.length > 0 ? <div>
            <h2>Uploading {this.state.files.length} files...</h2>
            <div>{this.state.files.map(file => <img src={file.preview} width="100px" height="100px"/>)}</div>
            </div> : null}
          </div>
      )
    }
}