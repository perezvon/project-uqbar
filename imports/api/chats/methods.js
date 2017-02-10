import { Chats } from './chats.js'

Meteor.methods({
  newChatComment(comment) {
    Chats.insert(comment);
  }
});