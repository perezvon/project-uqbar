import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import { Profiles } from '../api/users/users'

export default class Avatar extends Component {
    constructor(props) {
        super(props);
    }
    
    render () {
        let avatarUrl = 'https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png';
        let username = this.props.username;
          Meteor.subscribe('profiles');
          let temp = Profiles.findOne({username: username});
          if (temp) avatarUrl = temp.avatar;
    let avatarStyle = {backgroundImage: 'url(' + avatarUrl + ')'};
        return (
            <div className="avatar" style={avatarStyle} ></div>
            )
    }
}