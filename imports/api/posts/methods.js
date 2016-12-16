import { Posts } from './posts.js'

Meteor.methods({
  newPost(post) {
    Posts.insert(post);
  },
  updatePost(post, data) {
    Posts.update({_id: post}, data);
  }
});