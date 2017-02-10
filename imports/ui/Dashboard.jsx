import React from 'react'
import UserDrafts from './UserDrafts'
import FriendsList from './FriendsList'
import Profile from './Profile'

export const Dashboard = () => {
        return (
            <div>
                <div className="h2">Your Dashboard</div>
                <Profile />
                <UserDrafts />
                <FriendsList />
            </div>
        )
    }