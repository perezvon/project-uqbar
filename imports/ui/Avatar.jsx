import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import DropdownMenu from './DropdownMenu'

export default class Avatar extends Component {
    constructor (props) {
        super(props);
        this.toggleMenu = () => {(document.getElementById("user-dropdown-menu").style.display == "block" ?  document.getElementById("user-dropdown-menu").style.display = "none" : document.getElementById("user-dropdown-menu").style.display = "block")};
    }
    
  render () {
      let avatarUrl = 'https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png';
      let username = 'fixmeplease';
      // this is firing before Meteor user data loads, so Meteor.user() is always undefined. Surprisingly difficult to figure out how best to fix this.
      if (this.props.auth && Meteor.user()) {
          avatarUrl = Meteor.user().profile.avatar;
          username = Meteor.user().username;
      }
      
    let avatarStyle = {backgroundImage: 'url(' + avatarUrl + ')'};
    return (
        <div className="user-nav">
            <div className="avatar" style={avatarStyle} onClick={this.toggleMenu}></div>
            <DropdownMenu username={username} />
        </div>
    )
  }
}

