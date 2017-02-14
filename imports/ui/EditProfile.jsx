import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Profiles } from '../api/users/users'
import UserDrafts from './UserDrafts'

class EditProfile extends Component {
    constructor(props) {
        super (props);
   }
	
	updateProfile = (e) => {
		e.preventDefault();
		const username = Meteor.user().username;
		const data = {
		}
		//Meteor.call('updateProfile', username, {$set: data});
	}
	
	handleInputChange = () => {
		this.setState({
			
		})
	}
	
	render () {
		const {dataReady, userProfile} = this.props;
        if (dataReady && userProfile) {
            const imgStyle = {
                width: 100,
                height: 100,
                border: "1px solid black",
                borderRadius: "100%",
                background: "no-repeat center center",
                backgroundSize: "cover",
                backgroundImage: "url(" + userProfile.avatar + ")"
            }
		return (
			<div className="container-fluid">
				<form onSubmit={this.updateProfile}>
					<div>
						<h2 className="h2">{userProfile.username}</h2>
                <label htmlFor="authorname" className="form-input" onChange={this.handleInputChange}>Author Name: (this is the name that will appear on your stories)</label>
				<input type="text" className="form-input" value={userProfile.authorname} id="authorname" onChange={this.handleInputChange}></input>
				<label htmlFor="bio">Bio: </label>
                <textarea value={userProfile.bio} className="form-input" id="bio" onChange={this.handleInputChange}></textarea>
                <div style={imgStyle} id="avatar"></div>
					</div>
				</form>
			</div>
		)
	}
	}
}

export default createContainer(({params}) => {
	const handle = Meteor.subscribe('profiles');
	const dataReady = handle.ready();
    const username = params ? params.username : Meteor.user().username;
    return {
		dataReady,
		currentUser: Meteor.user().username,
        userProfile: Profiles.findOne({username: username})
    };
}, EditProfile);