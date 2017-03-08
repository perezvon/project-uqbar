import React, { Component } from 'react'
import { Meteor } from 'meteor/meteor'
import {getAvatarByUsername} from '../utils/global'


export const Avatar = (props) => {
        let avatarUrl = 'https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png';
        let username = props.username;
          let hasAvatar = getAvatarByUsername(username);
          if (hasAvatar) avatarUrl = hasAvatar;
    let avatarStyle = {backgroundImage: 'url(' + avatarUrl + ')'};
	let avatarSize = props.isChat ? "avatar avatar-small" : "avatar";
        return (
            <div className={avatarSize} style={avatarStyle} ></div>
            )
    }