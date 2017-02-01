import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import  { Editor, EditorState, convertFromRaw } from 'draft-js'
import { Posts } from '../api/posts/posts.js'
import PostEditor from './PostEditor'
import ViewPost from './ViewPost'

class ViewDraft extends Component {
    constructor (props) {
        super(props);  
        let body = convertFromRaw(JSON.parse(this.props.current.body));
        this.state = {
            editorState: EditorState.createWithContent(body)
        }
    }
    
    
    componentWillMount () {
        const readOnly = this.props.params.username == Meteor.user().username ? false : true;
        this.setState({
            readOnly: readOnly
        });
    }
    
    render () {
      const {editorState} = this.state;
        if (this.state.readOnly) {
            return (
                <ViewPost current={this.props.current} editorState={editorState} draft='true' />
            )
        } else {
            return (
                <div>
                    <div className="h2">Edit Draft</div>
                    <PostEditor current={this.props.current} editorState={editorState} readOnly={this.state.readOnly} />
                </div>
            )
        }
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