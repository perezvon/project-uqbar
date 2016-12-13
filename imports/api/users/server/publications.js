import { Meteor } from 'meteor/meteor'

Meteor.publish('user-profile', function() {
return Meteor.users.find({_id : this.userId}, {fields : {profile : 1}});
});