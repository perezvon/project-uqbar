import { Posts } from "../posts.js" 

Meteor.publish( 'posts', () => {
  return Posts.find();
});