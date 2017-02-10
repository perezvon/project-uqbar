import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Profiles } from '../api/users/users'
import UserDrafts from './UserDrafts'

class Profile extends Component {
    constructor(props) {
        super (props);
   }
	
	 addFriend = () => {
            if (this.state.currentUserProfile) Meteor.call('sendFriendRequest', this.state.loggedInUser, this.state.currentUserProfile);
            //to do: if opted in to friend request emails, send new friend request email
            $('#addFriend').html('Request Sent').prop('disabled', true).removeClass('pu-button-dark').addClass('pu-button-dark-disabled');
        }

        confirmFriend = () => {
            if (this.state.currentUserProfile) Meteor.call('acceptFriendRequest', this.state.loggedInUser, this.state.currentUserProfile);
            $('#confirmFriend').html('Friend Added!').prop('disabled', true).removeClass('pu-button-dark').addClass('pu-button-dark-disabled');
            //to do: reactively update the page to show the new friend's drafts
        }
    
    componentWillMount () {
		const {userProfile, currentUser} = this.props;
        let friendship = userProfile.friends.filter((friend)=>{return friend.user == currentUser});
        let friendsStatus = '';
        if (friendship && friendship.length !== 0) friendsStatus = friendship[0].status;
		console.log(friendsStatus);
        this.setState({
            loggedInUser: currentUser,
            currentUserProfile: userProfile.username || '',
            friendsStatus: friendsStatus,
            userDrafts: ''
        });
    }
    
    componentDidMount () {
        if (this.state.friendsStatus) $('#addFriend').prop('disabled', true).removeClass('pu-button-dark').addClass('pu-button-dark-disabled');
        if (this.state.friendsStatus == 'request' || this.state.friendsStatus == 'ignored') {
            $('#addFriend').html('Request Sent');
        } else if (this.state.friendsStatus == 'friends') {
            $('#addFriend').html('Friends');
        }
		if (this.state.friendsStatus == 'friends') {
                this.setState({
                userDrafts: <UserDrafts username={this.state.currentUserProfile} />
                });
            }
    }
    
    render () {
		const {dataReady, userProfile} = this.props;
        if (dataReady && userProfile) {
            let imgStyle = {
                width: 100,
                height: 100,
                border: "1px solid black",
                borderRadius: "100%",
                background: "no-repeat center center",
                backgroundSize: "cover",
                backgroundImage: "url(" + userProfile.avatar + ")"
            }
            
            let addFriendButton = '', confirmFriendButton = '', editProfileButton = '';
            
            if (userProfile.username !== Meteor.user().username && this.state.friendsStatus !=='sent') {
                addFriendButton = <button className="pu-button-dark" id="addFriend" onClick={this.addFriend}>Add Friend</button>;
            }
            if (userProfile.username == Meteor.user().username) {
                editProfileButton = <button className="pu-button-dark">Edit Profile</button>;
            }
            if (this.state.friendsStatus == 'sent') {
                confirmFriendButton = <button className="pu-button-dark" id="confirmFriend" onClick={this.confirmFriend}>Confirm Friend</button>;
            }
        return (
            <div>
                {userProfile.authorname} <br/>
                {userProfile.bio}
                <div style={imgStyle}></div>
                {editProfileButton}
                {addFriendButton}
                {confirmFriendButton}
                {this.state.userDrafts}
            </div>
        )
        } else {
            return (<div>No Profile Info</div>)
        }
    }
}

Profile.PropTypes = {
    user: PropTypes.array.isRequired
};

export default createContainer(({params}) => {
	const handle = Meteor.subscribe('profiles');
	const dataReady = handle.ready();
    const username = params ? params.username : Meteor.user().username;
    return {
		dataReady,
		currentUser: Meteor.user().username,
        userProfile: Profiles.findOne({username: username})
    };
}, Profile);