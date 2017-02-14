import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import  { Editor, EditorState, convertFromRaw } from 'draft-js'
import { Posts } from '../api/posts/posts.js'
import PostEditor from './PostEditor'
import ViewFriendDraft from './ViewFriendDraft'
import Chat from './Chat'

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
            readOnly: readOnly,
			id: this.props.current._id
        });
    }
    
    render () {
      const {editorState, id, readOnly} = this.state;
		console.log(id)
        if (readOnly) {
            return (
                <ViewFriendDraft current={this.props.current} editorState={editorState} draft='true' />
            )
        } else {
            return (
                <div>
                    <div className="h2">Edit Draft</div>
                    <PostEditor current={this.props.current} editorState={editorState} />
					<Chat id={id} />
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