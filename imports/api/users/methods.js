import { Meteor } from 'meteor/meteor'
import { Profiles } from './users'

Meteor.methods({ 
    sendFriendRequest (activeUser, potentialFriend) {
        Profiles.update({username: activeUser},{$addToSet: {friends: {user: potentialFriend, status: 'sent'}}});
        Profiles.update({username: potentialFriend},{$addToSet: {'friends': {user: activeUser, status: 'request'}}});
    },

    acceptFriendRequest (activeUser, newFriend) {
        Profiles.update({username: activeUser, 'friends.user': newFriend}, {$set: {'friends.$.status': 'friends'}});
        Profiles.update({username: newFriend, 'friends.user': activeUser}, {$set: {'friends.$.status': 'friends'}});
    },
  
    ignoreFriendRequest (activeUser, nonFriend) {
        Profiles.update({username: activeUser, 'friends.user': nonFriend}, {$set: {'friends.$.status': 'ignored'}});
    },
    
    newProfile (user) {
        Profiles.insert({username: user});
    },
    
    updateProfile (user, data){
        Profiles.update(user, data);
    }
});