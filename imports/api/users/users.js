import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo';

//deny write to default user profile

Meteor.users.deny({
  update() { return true; }
});


export const Profiles = new Mongo.Collection('profiles');

Profiles.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Profiles.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});

let ProfilesSchema = new SimpleSchema({
    "username": {
    type: String,
    label: "The username of the user."
  },
    "authorname": {
        type: String,
        label: "The chosen author name of the user."
    },
  "avatar": {
    type: String,
    label: "The url of the user's avatar.",
      autoValue() {
          if (this.isInsert) return 'https://upload.wikimedia.org/wikipedia/en/b/b1/Portrait_placeholder.png';
      }
  },
    "bio": {
        type: String,
        label: "The user's bio."
    },
    "friends": {
        type: [Object],
        label: "A collection of friend relationships.",
        autoValue() {
            if (this.isInsert) return [];
        }
    },
    "friends.$.user": {
        type: String,
        label: "username of potential friend",
        min: 1
    },
    "friends.$.status": {
        type: String,
        label: "friendship status",
        min: 1
    }
    
});

Profiles.attachSchema( ProfilesSchema );
