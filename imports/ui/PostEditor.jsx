
import React, { Component, PropTypes } from 'react'
import { browserHistory } from 'react-router'
import  { Editor, getCurrentContent, convertToRaw, EditorState } from 'draft-js'
import { newPost } from '../api/posts/methods'
import ImageDropzone from './ImageDropzone'

export default class PostEditor extends Component {
  constructor (props) {  
    super (props);
      if (this.props.editorState) {
            this.state = {
                editorState: this.props.editorState,
                title: '',
                preview: ''
            };
          } else {
          this.state = {editorState: EditorState.createEmpty()};
          }
      this.onChange = (editorState) => this.setState({editorState});
      this.saveDraft = (e) => {
        e.preventDefault();
        console.log(this.state.editorState.getCurrentContent()); //will want to save to localStorage
      }
      this.publishDraft = (e) => {
          e.preventDefault();
          Meteor.call('updatePost', this.state.id, {$set: {published: true}}, (err) => {
            if (err) {
                Bert.alert(err.reason, 'danger');
            } else {
                Bert.alert("Your post is now published.", 'success');
                browserHistory.push('/');
            }
        });
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
          let author = Meteor.user().username;
          let preview = document.getElementById("post-preview").value;
		  let image = this.state.image || '/jamavatar.JPG';
		  let version = this.state.version+1;
          let data = {title: title, body: body, author: author, slug: slug, image: image, preview: preview, version: version};
          if (this.state.id) {
            Meteor.call('updatePost', this.state.id, {$set: data}, (err) => {
            if (err) {
                Bert.alert(err.reason, 'danger');
            } else {
                Bert.alert("All changes saved.", 'success');
            }
        });
          } else {
            Meteor.call('newPost', data, (err) => {
            if (err) {
                Bert.alert(err.reason, 'danger');
            } else {
                Bert.alert("New draft created.", 'success');
                browserHistory.push('/dashboard');
            }
        });
          }
      }
  }
    componentWillMount () {
        if (this.props.current) {
            this.setState({
                id: this.props.current._id,
                title: this.props.current.title,
                preview: this.props.current.preview,
                slug: this.props.current.slug,
				image: this.props.current.image,
				version: this.props.current.version
            });
        }
    }
    
    componentDidMount () {
		console.log(this.state)
        document.getElementById("post-slug").value = this.state.slug;
    }
    
  render () {
    const {editorState} = this.state;
	  const image = this.state.image || '';
    return (
        <div style={{backgroundImage: image}}>
			<ImageDropzone />
            <form id="post-edit-form" onSubmit={this.handleSubmit}>
        <div className="form-control">
            <label htmlFor="post-title">Title: </label><br/>
            <input type="text" id="post-title" className="form-input" defaultValue={this.state.title} onChange={this.generateSlug}/>
        </div>
                <div className="form-control">
            <label htmlFor="post-preview">Subtitle / Preview: </label>
            <input type="text" id="post-preview" className="form-input" defaultValue={this.state.preview} />
        </div>
        <div className="form-control hidden">
            <label htmlFor="post-slug">Slug: </label>
            <input type="text" id="post-slug" className="form-input" />
        </div>
                <div className="editor-container">
      <Editor 
          className="editor" 
          editorState={editorState} 
          onChange={this.onChange}
          readOnly={this.props.readOnly}
          placeholder="Start writing..."
      />
                    </div>
                        <input
                className="pu-button-dark"
                type="submit"
                value="Save Draft"
              />
            <button className="pu-button-dark publish-draft" onClick={this.publishDraft}>Publish Draft</button>
            </form>
                </div>
        )
  }
    
}
