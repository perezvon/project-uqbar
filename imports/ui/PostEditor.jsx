
import React, { Component, PropTypes } from 'react'
import  { Editor, getCurrentContent, convertToRaw, EditorState } from 'draft-js'
import { newPost } from '../api/posts/methods'

export default class PostEditor extends Component {
  constructor (props) {  
    super (props);
      this.state = {editorState: EditorState.createEmpty()};
      this.onChange = (editorState) => this.setState({editorState});
      this.saveDraft = (e) => {
        e.preventDefault();
        console.log(this.state.editorState.getCurrentContent()); //will want to save to localStorage
      }
      this.generateSlug = () => {
          let text = document.getElementById("post-title").value;
          let slug = Meteor.user().username + '/' + getSlug(text);
          document.getElementById("post-slug").value = slug;
      }
      this.handleSubmit = (e) => {
          e.preventDefault();
          let raw = this.state.editorState.getCurrentContent();
          let body = JSON.stringify(convertToRaw(raw));
          let title = document.getElementById("post-title").value;
          let slug = document.getElementById("post-slug").value;
          let author = Meteor.userId();
          let preview = document.getElementById("post-preview").value;
          let data = {title: title, body: body, author: author, slug: slug, preview: preview};
          //console.log(data);
          Meteor.call('newPost', data);
      }
  }
  render () {
    const {editorState} = this.state;
    return (
        <div>
            <form id="post-edit-form" onSubmit={this.handleSubmit}>
        <div className="form-control">
            <label htmlFor="post-title">Title: </label>
            <input type="text" id="post-title" className="form-input" onChange={this.generateSlug}/>
        </div>
                <div className="form-control">
            <label htmlFor="post-preview">Subtitle / Preview: </label>
            <input type="text" id="post-preview" className="form-input" />
        </div>
        <div className="form-control hidden">
            <label htmlFor="post-slug">Slug: </label>
            <input type="text" id="post-slug" className="form-input" />
        </div>
      <Editor 
          editorState={editorState} 
          onChange={this.onChange}
          placeholder="Start writing..."
      />
                        <input
                className="pu-button"
                type="submit"
                value="Save Draft"
              />
            </form>
    </div>
        )
  }
    
}
