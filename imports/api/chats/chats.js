import { Mongo } from 'meteor/mongo';

export const Chats = new Mongo.Collection('chats');

Chats.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Chats.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});


let ChatsSchema = new SimpleSchema({
  "user": {
    type: String,
    label: "The user who is chatting."
  },
  "comment": {
    type: String,
    label: "The contents of the chat comment.",
  },
    
    "post_id": {
        type: String,
        label: "The linked id of the post.",
    },
    date: {
      type: Date,
        label: "The date of the chat.",
        autoValue () {
            if ( this.isInsert ) {
                return new Date;
            } 
        },
        denyUpdate: true
    }
});

Chats.attachSchema( ChatsSchema );