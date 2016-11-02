import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { browserHistory } from 'react-router'
import LandingPage from './LandingPage'
import RecentPosts from './RecentPosts'
import Navigation from './Navigation'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = this.getMeteorData();
        this.logout = this.logout.bind(this);
    }
    
    getMeteorData () {
        return {
            isAuthenticated: Meteor.userId() !== null
        };
    }
    
    componentWillMount () {
        if (!this.state.isAuthenticated) {
            browserHistory.push('join');
        }
    }
    
    componentDidUpdate (prevProps, prevState) {
        if (!this.state.isAuthenticated) {
            browserHistory.push('login');
        }
    }
    
    logout(e) {
        e.preventDefault();
        Meteor.logout();
        browserHistory.push('login');
    }
    
    render () {
        return (
            <div className="flex-container">
                <Navigation />
                {this.props.children}
            </div>
        )
    }
}

