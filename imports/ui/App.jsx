import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { browserHistory } from 'react-router'
import LandingPage from './LandingPage'
import Navigation from './Navigation'
import Loading from 'react-loading'
import { Profiles } from '../api/users/users'

class App extends Component {
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
       const {currentUser, userProfile, profileDataLoaded, postsDataLoaded, children} = this.props;
            return (
				<div>
				{currentUser && profileDataLoaded && postsDataLoaded ?
				<div className="flex-container">
					<Navigation auth={this.state.isAuthenticated} currentUser={currentUser} userProfile={userProfile[0]} />
						{children} </div>:
						<div className="flex-container"><Loading type='cylon' color='#000' /></div>
				}
					</div>
            )
       // }
    }
}

export default createContainer(() => {
    const profileHandle = Meteor.subscribe('profiles');
	const profileDataLoaded = profileHandle.ready();
	const postsHandle = Meteor.subscribe('posts');
	const postsDataLoaded = postsHandle.ready();
    return {
		profileDataLoaded,
		postsDataLoaded,
		currentUser: Meteor.user(),
        userProfile: profileDataLoaded ? Profiles.find({username: Meteor.user().username}).fetch() : undefined
    };
}, App);
