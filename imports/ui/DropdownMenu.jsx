import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'
import FontAwesome from 'react-fontawesome'

export default class DropdownMenu extends Component {
    constructor(props) {
        super(props);
    }
	
	logout = () => { Meteor.logout((err) => {
            if (err) {
                Bert.alert(err.reason, "danger");
            } else {
                Bert.alert("Logged out", "success");
                browserHistory.push("/");
            }
        })}
	
	confirmFriend = (newFriend) => {
		Meteor.call('acceptFriendRequest', Meteor.user().username, newFriend)
		//todo: update state on success & display success message
	} 
	
    render () {
		const {username, friendReqs} = this.props;
        const userProfile = "profile/" + username;
        const newFriendRequests = friendReqs ? friendReqs.map((each, index) => {return <div key={index} className="dropdown-link">{each.user}<FontAwesome name="user-plus" onClick={this.confirmFriend(each.user)} /></div>}) : '';
		if (Meteor.user()) {
        return (
        <div className="dropdown-menu" id="user-dropdown-menu">
		<div className="arrow"></div>
                <span className="dropdown-username">{username}</span><span className="whatnot"></span>
			<Link to="new" className="dropdown-link">New Story <span className="whatnot"></span></Link>
			<Link to="dashboard" className="dropdown-link">Dashboard <span className="whatnot"></span></Link>
			<Link to="#" className="dropdown-link" onClick={this.logout}>Logout <span className="whatnot"></span></Link>
                {newFriendRequests}
		</div>
        )
    } else {
		return (
			<div className="dropdown-menu" id="user-dropdown-menu">
		<div className="arrow"></div>
				<Link to="login" className="dropdown-link">Login <span className="whatnot"></span></Link>
			</div>
		)
	}
	}
}
