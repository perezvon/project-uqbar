import { Profiles } from "../users.js" 

Meteor.publish( 'profiles', () => {
  return Profiles.find();
});