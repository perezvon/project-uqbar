import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { browserHistory } from 'react-router'

export default class Avatar extends Component {
    constructor (props) {
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
    let avatarUrl = (Meteor.user() ? Meteor.user().profile.avatar : 'https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png');
    let avatarStyle = {backgroundImage: 'url(' + avatarUrl + ')'};
    return (
        <div className="user-nav">
            <div className="avatar" style={avatarStyle} onClick={this.logout}></div>
        </div>
    )
  }
}
    