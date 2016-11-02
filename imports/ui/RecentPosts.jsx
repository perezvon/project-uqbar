import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import { Posts } from '../api/posts.js';
import PostCard from './PostCard';
class RecentPosts extends Component {
    recentPosts () {
        return this.props.posts.map((post) => (
         <PostCard key={post._id} title={post.title} body={post.body} author={post.author} image={post.image} faves={post.faves} slug={post.slug}/>
        ));
    }
    
    render () {
        return (<div>
        <div className="h2">Most Recent Posts</div>
            {this.recentPosts()}
                </div>
        )
    }
}

RecentPosts.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default createContainer(() => {
    return {
        posts: Posts.find({published: true}, {sort: {createdAt: -1}, limit: 9}).fetch()
    };
}, RecentPosts);