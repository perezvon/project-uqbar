import React, { Component } from 'react'
import UserDrafts from './UserDrafts'

export default class Dashboard extends Component {
    render () {
        return (
            <div>
                <div className="h2">Your Motherfucking Dashboard</div>
                <UserDrafts />
            </div>
        )
    }
}