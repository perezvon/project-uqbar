import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data'
import  { Editor, EditorState, convertFromRaw } from 'draft-js'
import { Posts } from '../api/posts/posts.js'

class ViewPost extends Component {
    constructor (props) {
        super(props);  
        let body = convertFromRaw(JSON.parse(this.props.current.body));
        this.state = {
            editorState: EditorState.createWithContent(body)
        }
        this.fave = () => { 
             //let currentUserId = Meteor.user().username;
            Meteor.call('updatePost', this.state.id, {$inc: {faves: 1} /*, $addToSet: {favorite: currentUserId}*/});
        }
    }
    
    componentWillMount () {
        if (this.props.current) {
            this.setState({
                id: this.props.current._id,
                image: this.props.current.image
            })
        }
    }
    
    render () {
        let postHeroStyle = {}; 
            this.props.current ? postHeroStyle.backgroundImage = 'url("' + this.props.current.image + '")': postHeroStyle.backgroundColor = '#999';
      const {editorState} = this.state;
        let fave = this.props.draft == true ? '' : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fave" onClick={this.fave}><path d="M12 .288l2.833 8.718h9.167l-7.417 5.389 2.833 8.718-7.416-5.388-7.417 5.388 2.833-8.718-7.416-5.389h9.167z"/></svg>;
        let authorLink = "/profile/" + this.props.params.username;
        return (
            <div className="flex-row">
                <div className="post-hero" style={postHeroStyle}>
                    <div className="h2">{this.props.current.title}</div>
                    <div className="h3">by: <Link to={authorLink}>{this.props.current.author}</Link></div>
                </div>
                <div className="view-post">
                <Editor editorState={editorState} readOnly='true' />
                {fave}
                </div>
            </div>
        )
    }
}



ViewPost.PropTypes = {
    current: PropTypes.object.isRequired
};

export default createContainer(({params}) => {
    return {
        current: Posts.findOne({slug: params.username + '/' + params.slug})
    };
}, ViewPost);