import React, { Component } from 'react'
import UserDrafts from './UserDrafts'
import FriendsList from './FriendsList'
import Profile from './Profile'

export default class Dashboard extends Component {
    render () {
        return (
            <div>
                <div className="h2">Your Dashboard</div>
                <Profile />
                <UserDrafts />
                <FriendsList />
            </div>
        )
    }
}