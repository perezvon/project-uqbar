import React, { Component } from 'react';
import { Link } from 'react-router';
import Avatar from './Avatar.jsx';

export default class Navigation extends Component {
    render () {
        return (
            <div className="header">
                <ul>
                    <Link to="/"><li>home</li></Link>
                    <Link to="dashboard"><li>dashboard</li></Link>
                    <Link to="new"><li>new post</li></Link>
                </ul>
                <Avatar auth={this.props.auth}/>
            </div>
        )
    }
}