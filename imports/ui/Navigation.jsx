import React, { Component } from 'react'
import { Link } from 'react-router'
import RightNav from './RightNav'

export default class Navigation extends Component {
    render () {
		const {auth, currentUser, userProfile} = this.props;
        return (
            <div className="header">
                <ul>
                    <Link to="/"><li>home</li></Link>
                    <Link to="about"><li>about</li></Link>
                </ul>
                <RightNav auth={auth} currentUser={currentUser} userProfile={userProfile} />
            </div>
        )
    }
}