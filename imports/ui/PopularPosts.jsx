import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Posts } from '../api/posts/posts'
import PostCard from './PostCard'

class PopularPosts extends Component {
    constructor (props) {
        super(props);
    }
    
    popularPosts () {
        return this.props.posts.map((post) => (
         <PostCard key={post._id} title={post.title} body={post.body} preview = {post.preview} author={post.author} image={post.image} faves={post.faves} slug={post.slug}/>
        ));
        };
    
    render () {
        return (<div>
        <div className="h2">Most Popular Stories</div>
            {this.popularPosts()}
                </div>
        )
    }
}

PopularPosts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default createContainer(() => {
    Meteor.subscribe('posts');
    return {
        posts: Posts.find({published: true}, {sort: {faves: -1}, limit: 9}).fetch()
    };
}, PopularPosts);