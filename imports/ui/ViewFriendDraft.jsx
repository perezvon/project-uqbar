import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data'
import  { Editor, EditorState, convertFromRaw } from 'draft-js'
import Chat from './Chat'

export default class ViewFriendDraft extends Component {
    constructor (props) {
        super(props);  
        let body = convertFromRaw(JSON.parse(this.props.current.body));
        this.state = {
            editorState: EditorState.createWithContent(body)
        }
    }
    
    componentWillMount () {
        if (this.props.current) {
            this.setState({
                id: this.props.current._id,
                image: this.props.current.image,
                title: this.props.current.title,
                author: this.props.current.author,
				version: this.props.current.version
            })
        }
    }
    
    render () {
        let postHeroStyle = {}; 
            this.state.image ? postHeroStyle.backgroundImage = 'url("' + this.state.image + '")': postHeroStyle.backgroundColor = '#999';
      const {editorState} = this.state;
        
        let authorLink = "/profile/" + this.state.author;
        return (
            <div className="flex-row">
                <div className="draft-overlay">
                        <div className="draft-overlay-text">DRAFT</div>
                    </div>
                <div className="post-hero" style={postHeroStyle}>
                    <div className="h2">{this.state.title} (version {this.state.version})</div>
                    <div className="h3">by: <Link to={authorLink}>{this.state.author}</Link></div>
                </div>
                <div className="view-post">
                <Editor editorState={editorState} readOnly='true' />
					<Chat id={this.state.id}/>
                </div>
            </div>
        )
    }
}



ViewFriendDraft.PropTypes = {
    current: PropTypes.object.isRequired
};