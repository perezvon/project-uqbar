import { Posts } from './posts.js'

Meteor.methods({
  newPost(post) {
    Posts.insert(post);
  }
});