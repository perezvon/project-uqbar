import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Profiles } from '../api/users/users'
import UserDrafts from './UserDrafts'

class Profile extends Component {
    constructor(props) {
        super (props);
        this.addFriend = () => {
            if (this.state.currentUserProfile) Meteor.call('sendFriendRequest', this.state.loggedInUser, this.state.currentUserProfile);
            //to do: if opted in to friend request emails, send new friend request email
            $('#addFriend').html('Request Sent').prop('disabled', true).removeClass('pu-button-dark').addClass('pu-button-dark-disabled');
        };
        this.confirmFriend = () => {
            if (this.state.currentUserProfile) Meteor.call('acceptFriendRequest', this.state.loggedInUser, this.state.currentUserProfile);
            $('#confirmFriend').html('Friend Added!').prop('disabled', true).removeClass('pu-button-dark').addClass('pu-button-dark-disabled');
            //to do: reactively update the page to show the new friend's drafts
        };
    }
    
    componentWillMount () {
        let currentUser = Meteor.user().username;
        let friendship = this.props.user[0].friends.filter((friend)=>{return friend.user == currentUser});
        let friendsStatus = '';
        if (friendship && friendship.length !== 0) friendsStatus = friendship[0].status;
        this.setState({
            loggedInUser: currentUser,
            currentUserProfile: this.props.user[0].username || '',
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
    }
    
    render () {
        if (this.props.user && this.props.user.length !== 0) {
            let imgStyle = {
                width: 100,
                height: 100,
                border: "1px solid black",
                borderRadius: "100%",
                background: "no-repeat center center",
                backgroundSize: "cover",
                backgroundImage: "url(" + this.props.user[0].avatar + ")"
            }
            
            let addFriendButton = '', confirmFriendButton = '', editProfileButton = '';
            
            if (this.props.user[0].username !== Meteor.user().username && this.state.friendsStatus !=='sent') {
                addFriendButton = <button className="pu-button-dark" id="addFriend" onClick={this.addFriend}>Add Friend</button>;
            }
            if (this.props.user[0].username == Meteor.user().username) {
                editProfileButton = <button className="pu-button-dark">Edit Profile</button>;
            }
            if (this.state.friendsStatus == 'friends') {
                this.setState({
                userDrafts: <UserDrafts username={this.state.currentUserProfile} />
                });
            }
            if (this.state.friendsStatus == 'sent') {
                confirmFriendButton = <button className="pu-button-dark" id="confirmFriend" onClick={this.confirmFriend}>Confirm Friend</button>;
            }
        return (
            <div>
                {this.props.user[0].authorname} <br/>
                {this.props.user[0].bio}
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
    let username = params ? params.username : Meteor.user().username;
    Meteor.subscribe('profiles');
    return {
        user: Profiles.find({username: username}).fetch()
    };
}, Profile);