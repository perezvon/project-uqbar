import { Meteor } from 'meteor/meteor'
import { Profiles } from '../../api/users/users'

export const createNewProfiles = () => Meteor.users.find().fetch().forEach(user => {
	console.log(user.username);
	if (!Profiles.findOne({username: user.username})) {
		Meteor.call('newProfile', {email: user.emails[0].address, username: user.username, authorname: user.profile.authorname, friends: user.profile.friends});
	}
});

