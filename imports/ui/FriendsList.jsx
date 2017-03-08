import { Meteor } from 'meteor/meteor'
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { createContainer } from 'meteor/react-meteor-data'
import { Profiles } from '../api/users/users'
import {Avatar} from './Avatar'


class FriendsList extends Component {
    friends = () => {
		const {friends} = this.props;
        if (friends) {
            let userProfile = 'profile/';
        return friends.filter(each => {return each.status === 'friends'}).map((friend, index) => (
            userProfile = 'profile/' + friend.user,
            <Link key={index} to={userProfile}><Avatar key={index} username={friend.user} /></Link>
        ));
        } else {
            return false
        }
    }
    
    render () {
        return (
            <div>
                <div className="h2">Your Friends</div>
                {this.friends() ? this.friends() : 'no friends yet'}
            </div>
        )
    }
}

FriendsList.propTypes = {
  friends: PropTypes.array,
};

export default createContainer(() => {
    let username = Meteor.user().username;
    return {
        friends: Profiles.findOne({username: username}, {fields: {friends: 1}}).friends
    };
}, FriendsList);