import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import DropdownMenu from './DropdownMenu'
import Avatar from './Avatar'
import { Profiles } from '../api/users/users'
import AlertBubble from './AlertBubble'

export default class RightNav extends Component {
    constructor (props) {
        super(props);
        this.toggleMenu = () => {(document.getElementById("user-dropdown-menu").style.display == "block" ?  document.getElementById("user-dropdown-menu").style.display = "none" : document.getElementById("user-dropdown-menu").style.display = "block")};
    }
    
  render () {
      let username = 'fixmeplease';
      let friendReqs = '';
      let number = 0;
       if (Meteor.user()) {
          username = Meteor.user().username;
            friendReqs = Profiles.findOne({username: username}, {fields: {friends: 1}}).friends.filter(each => {return each.status == 'request'});
            number = friendReqs.length;
      }
      let alertBubble = '';
      if (number) {
          alertBubble = <AlertBubble number={number} />;
          
      }
      
    return (
        <div className="user-nav" onClick={this.toggleMenu}>
            <Avatar username={username} />
            <DropdownMenu username={username} friendReqs={friendReqs}/>
            {alertBubble}
        </div>
    )
  }
}

