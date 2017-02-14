import { Meteor } from 'meteor/meteor'
import { Profiles } from '../api/users/users'

export const getAvatarByUsername = (username) => {
	Meteor.subscribe('profiles');
	const avatar = Profiles.findOne({username: username}, {fields: {avatar: 1}}).avatar;
	return avatar;
}