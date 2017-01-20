import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import DropdownMenu from './DropdownMenu'
import Avatar from './Avatar'

export default class RightNav extends Component {
    constructor (props) {
        super(props);
        this.toggleMenu = () => {(document.getElementById("user-dropdown-menu").style.display == "block" ?  document.getElementById("user-dropdown-menu").style.display = "none" : document.getElementById("user-dropdown-menu").style.display = "block")};
    }
    
  render () {
      let username = 'fixmeplease';
       if (Meteor.user()) {
          username = Meteor.user().username;
      }
    return (
        <div className="user-nav" onClick={this.toggleMenu}>
            <Avatar username={username} />
            <DropdownMenu username={username} />
        </div>
    )
  }
}

