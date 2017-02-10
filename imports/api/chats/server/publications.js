import { Chats } from "../chats.js" 

Meteor.publish( 'chats', (post_id) => {
  return Chats.find({post_id: post_id}, {sort: {date: -1}});
});