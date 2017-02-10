import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import DropdownMenu from './DropdownMenu'
import Avatar from './Avatar'
import { Profiles } from '../api/users/users'
import AlertBubble from './AlertBubble'

export default class RightNav extends Component {
	state = {
		friendReqs: [],
		alertBubble: '',
		numReqs: 0,
		username: ''
		
	}
    constructor (props) {
        super(props);
        this.toggleMenu = () => {(document.getElementById("user-dropdown-menu").style.display == "block" ?  document.getElementById("user-dropdown-menu").style.display = "none" : document.getElementById("user-dropdown-menu").style.display = "block")};
    }
	
	componentDidMount () {
		const {userProfile, currentUser} = this.props;
		   this.setState({
			username: currentUser.username,
            friendReqs: userProfile ? userProfile.friends.filter(each => {return each.status == 'request'}) : [],
			numReqs: this.state.friendReqs.length
			   })
      if (this.state.numReqs) {
          this.setState({
			  alertBubble: <AlertBubble number={this.state.numReqs} />
		  });
          
      }
	}
  render () {
	  const {currentUser} = this.props;
	  const {friendReqs, alertBubble} = this.state;
    return (
        <div className="user-nav" onClick={this.toggleMenu}>
            <Avatar username={currentUser.username} />
            <DropdownMenu username={currentUser.username} friendReqs={friendReqs}/>
            {alertBubble}
        </div>
    )
  }
}

