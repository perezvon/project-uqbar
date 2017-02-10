import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';
import { createContainer } from 'meteor/react-meteor-data'
import  { Editor, EditorState, convertFromRaw } from 'draft-js'
import { Posts } from '../api/posts/posts.js'
import {SocialButtons} from './SocialButtons'

class ViewPost extends Component {
    constructor (props) {
        super(props);  
        const body = convertFromRaw(JSON.parse(this.props.current.body));
        this.state = {
            editorState: EditorState.createWithContent(body)
        }
        this.fave = () => { 
             //let currentUserId = Meteor.user().username;
            Meteor.call('updatePost', this.state.id, {$inc: {faves: 1} /*, $addToSet: {favorite: currentUserId}*/});
        }
		this.tweet = () => {
			
		}
		this.fb = () => {
			
		}
    }
    
    componentWillMount () {
		const {current} = this.props;
        if (current) {
            this.setState({
                id: current._id,
                image: current.image
            })
        }
    }
	
	componentDidMount () {
		const vh = window.innerHeight / 2;
		$(window).on('scroll', e => {
			if ($(window).scrollTop() > vh) $('.social').removeClass('hidden')
			else $('.social').addClass('hidden')
		})
	}
    
    render () {
		const {current, dataReady, params} = this.props;
        let postHeroStyle = {}; 
            current ? postHeroStyle.backgroundImage = 'linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("' + current.image + '")': postHeroStyle.backgroundColor = '#999';
      const {editorState} = this.state;
        
        const authorLink = "/profile/" + params.username;
        return (
            <div className="flex-row">
                <div className="post-hero" style={postHeroStyle}>
                    <div className="h2">{current.title}</div>
                    <div className="h3 post-author">by: <Link to={authorLink}>{current.author}</Link></div>
                </div>
                <div className="view-post">
                <Editor editorState={editorState} readOnly='true' />
					{!current.draft ? <SocialButtons draft={current.draft} fave={this.fave} tweet={this.tweet} fb={this.fb}/> : ''}
                </div>
            </div>
        )
    }
}



ViewPost.PropTypes = {
    current: PropTypes.object.isRequired
};

export default createContainer(({params}) => {
	const handle = Meteor.subscribe('posts');
	const dataReady = handle.ready();
    return {
		dataReady,
        current: Posts.findOne({slug: params.username + '/' + params.slug})
    };
}, ViewPost);