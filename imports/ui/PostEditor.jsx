
import React, { Component, PropTypes } from 'react'
import {Editor, EditorState} from 'draft-js'

export default class PostEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.focus = () => this.refs.editor.focus();
    this.saveDraft = () => console.log(this.state.editorState.toJS());
      this.generateSlug = () => {
          let text = document.getElementById("post-title").value;
          let slug = Meteor.user().username + '/' + getSlug(text);
          // give slug value to slug form element
          console.log(slug);
      }
  }
    
  render() {
    const {editorState} = this.state;
    return (
        <div>
            <form id="post-edit-form">
        <div className="form-control">
            <label htmlFor="post-title">Title: </label>
            <input type="text" id="post-title" className="form-input" onChange={this.generateSlug}/>
        </div>
        <div className="editor-container">
        <div className="editor" onClick={this.focus}>
        <Editor 
            editorState={editorState} 
            onChange={this.onChange} 
            ref="editor"
        />
        </div>
            <input
                className="pu-button"
                onClick={this.saveDraft}
                type="button"
                value="Save Draft"
              />
        </div>
                </form>
        </div>
        );
  }
}

