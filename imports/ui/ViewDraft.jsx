import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import  { Editor, EditorState, convertFromRaw } from 'draft-js'
import { Posts } from '../api/posts/posts.js'
import PostEditor from './PostEditor';

class ViewDraft extends Component {
    constructor (props) {
        super(props);  
        let body = convertFromRaw(JSON.parse(this.props.current.body));
        this.state = {
            editorState: EditorState.createWithContent(body)
        }
    }
    
    
    componentWillMount () {
        //authentication: read-only if not owner of draft
    }
    
    render () {
      const {editorState} = this.state;
        return (
            <div>
                <div className="h2">Edit Draft</div>
                <PostEditor current={this.props.current} editorState={editorState} />
            </div>
        )
    }
}

ViewDraft.PropTypes = {
    current: PropTypes.object.isRequired
};

export default createContainer(({params}) => {
    return {
        current: Posts.findOne({slug: params.username + '/' + params.slug})
    };
}, ViewDraft);