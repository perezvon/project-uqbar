
import React, { Component } from 'react';
import PostEditor from './PostEditor';

export default class NewPost extends Component {
    render () {
        return (
            <div>
                <div className="h2">New Post</div>
                <PostEditor />
            </div>
        )
    }
}
