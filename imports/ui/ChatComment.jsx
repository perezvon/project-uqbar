import React from 'react'
import moment from 'moment'
import {Avatar} from './Avatar'

export const ChatComment = (props) => {
		const {chat} = props;
	const date = moment(chat.date).startOf('hour').fromNow();
		return (
		<div><Avatar username={chat.user} isChat='true'/> <span className="small-text">({date}): </span> {chat.comment}</div>
			)
}