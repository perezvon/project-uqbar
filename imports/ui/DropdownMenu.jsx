import { Meteor } from 'meteor/meteor';
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import { browserHistory } from 'react-router'

export default class DropdownMenu extends Component {
    constructor(props) {
        super(props);
        this.logout = () => { Meteor.logout((err) => {
            if (err) {
                Bert.alert(err.reason, "danger");
            } else {
                Bert.alert("Logged out", "success");
                browserHistory.push("/");
            }
        }) };
    }
    render () {
        let userProfile = "profile/" + this.props.username;
        let newFriendRequests = this.props.friendReqs ? this.props.friendReqs.map((each, index) => {return <div key={index} className="dropdown-link">{each.user}</div>}) : '';
        return (
        <div className="dropdown-menu" id="user-dropdown-menu">
		<div className="arrow"></div>
                <span className="dropdown-username">{this.props.username}</span><span className="whatnot"></span>
			<Link to="new" className="dropdown-link">New Story <span className="whatnot"></span></Link>
			<Link to="dashboard" className="dropdown-link">Dashboard <span className="whatnot"></span></Link>
			<Link to="#" className="dropdown-link" onClick={this.logout}>Logout <span className="whatnot"></span></Link>
                {newFriendRequests}
		</div>
        )
    }
}
