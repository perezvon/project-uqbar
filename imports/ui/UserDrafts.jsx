import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Posts } from '../api/posts/posts.js'
import PostCard from './PostCard'
import Draft from './Draft'

class UserDrafts extends Component {
    drafts () {
        return this.props.drafts.map((post) => (
         <Draft key={post._id} title={post.title} body={post.body} preview={post.preview} author={post.author} image={post.image} faves={post.faves} slug={post.slug}/>
        ));
    }
    
    render () {
        let currentUser = this.props.username ? this.props.username + '\'s' : 'Your';
        return (<div>
        <div className="h2">{currentUser} Drafts</div>
            {this.drafts()}
                </div>
        )
    }
}

UserDrafts.propTypes = {
  drafts: PropTypes.array.isRequired,
    username: PropTypes.string
};

export default createContainer(({username}) => {
    Meteor.subscribe('posts');
    let author = username ? username : Meteor.user().username;
    return {
        drafts: Posts.find({author: author, published: false}, {sort: {createdAt: -1}}).fetch()
    };
}, UserDrafts);