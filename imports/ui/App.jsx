import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { browserHistory } from 'react-router'
import LandingPage from './LandingPage'
import Navigation from './Navigation'
import Loading from 'react-loading'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = this.getMeteorData();
        this.logout = this.logout.bind(this);
    }
    
    getMeteorData () {
        return {
            isAuthenticated: !!Meteor.userId()
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
       /* let subscribed = Meteor.subscribe('posts');
        let loaded = subscribed.ready();
        if (!loaded) {
            return (
                <div className="flex-container">
                    <Navigation auth={this.state.isAuthenticated} />
                    <Loading type='cylon' color='#000' />
                </div>
            )
        } else { */
            return (
                <div className="flex-container">
                    <Navigation auth={this.state.isAuthenticated} />
                    {this.props.children}
                </div>
            )
       // }
    }
}

