import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Chats } from '../api/chats/chats'

class Chat extends Component {
	state = {
		chats: []
	}
	
	handleChatToggle = () => {
		const chat = $('.chat-line');
		if (!chat.hasClass('active')) { 
			chat.addClass('active');
			$('.chat').addClass('active');
			$('.chat-input-container').css('display', 'inline');
			$('.chat-input').css('display', 'inline');
		} else {
			chat.removeClass('active');
			$('.chat').removeClass('active');
			$('.chat-input-container').css('display', 'none');
			$('.chat-input').css('display', 'none');
		}
		
		
	}

	handleSubmit = (e) => {
		e.preventDefault();
		let post_id = this.props.id;
		let user = Meteor.user().username;
		let comment = $('#comment').val();
		const data = {post_id: post_id, user: user, comment: comment};
		Meteor.call('newChatComment', data);
		this.setState({
			chats: this.props.chats
		})
		$('.chat-input').val('')
	}
	
	componentWillMount = () => {
		this.setState ({
			chats: this.props.chats
		})
	}
	
    render () {
		console.log(this.state.chats)
		const chats = this.state.chats.map(chat => <div key={chat.post_id}>{chat.name} ({chat.date}): {chat.comment}</div>)
		console.log(chats)
        return (
            <div className="chat">
                <div id="chat-toggle" onClick={this.handleChatToggle}>
                      <span className="chat-line chat-line-1"></span>
                      <span className="chat-line chat-line-2"></span>
                </div>
                <div className="chat-container">
                  {chats}
                </div>
                <form className="chat-input-container" onSubmit={this.handleSubmit}>
                    <input className="chat-input" id="comment"></input>
                </form>
            </div>
        )
    }
}

export default createContainer(({id}) => {
	Meteor.subscribe('chats', id)
    return {
        chats: Chats.find({post_id: id}, {sort: {date: -1}}).fetch()
    };
}, Chat);