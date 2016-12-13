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
        return (<div>
        <div className="h2">Your Motherfucking Drafts</div>
            {this.drafts()}
                </div>
        )
    }
}

UserDrafts.propTypes = {
  drafts: PropTypes.array.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('posts');
    let author = Meteor.user().profile.authorname;
    
    return {
        drafts: Posts.find({author: author, published: false}, {sort: {createdAt: -1}}).fetch()
    };
}, UserDrafts);