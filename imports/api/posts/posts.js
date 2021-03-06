import { Mongo } from 'meteor/mongo';

export const Posts = new Mongo.Collection('posts');

Posts.allow({
  insert() { return false; },
  update() { return false; },
  remove() { return false; }
});

Posts.deny({
  insert() { return true; },
  update() { return true; },
  remove() { return true; }
});


let PostsSchema = new SimpleSchema({
  "published": {
    type: Boolean,
    label: "Is this post published?",
    autoValue() {
      if ( this.isInsert ) {
        return false;
      }
    }
  },
    "version": {
      type: Number,
        label: "The version number of a draft",
        autoValue() {
            if (this.isInsert) {
                return 1;
            }
        }
    },
    "author": {
    type: String,
    label: "The ID of the author of this post."
  },
  "title": {
    type: String,
    label: "The title of this post.",
    defaultValue: "Untitled Post"
  },
    "slug": {
    type: String,
    label: "The slug for this post.",
    autoValue () {
        if(this.isInsert) {
      let slug              = this.value,
          existingSlugCount = Posts.find( { _id: { $ne: this.docId }, slug: slug } ).count(),
          existingUntitled  = Posts.find( { slug: { $regex: /untitled-post/i } } ).count();

      if ( slug ) {
        return existingSlugCount > 0 ? `${ slug }-${ existingSlugCount + 1 }` : slug;
      } else {
        return existingUntitled > 0 ? `untitled-post-${ existingUntitled + 1 }` : 'untitled-post';
      }
    }
    }
  },
  "body": {
    type: String,
    label: "The body of this post.",
    optional: true
  },
    
    "preview": {
        type: String,
        label: "A preview of the post.",
        optional: true
    },
  "tags": {
    type: [ String ],
    label: "The tags for this post.",
    optional: true
  },
    createdAt: {
      type: Date,
        label: "The date of creation.",
        autoValue () {
            if ( this.isInsert ) {
                return new Date;
            } 
        },
        denyUpdate: true
    },
    "updatedAt": {
    type: Date,
    label: "The date this post was last updated.",
        optional: true,
    autoValue () {
            if ( this.isUpdate ) {
                return new Date;
            } 
    }
  },
    "image": {
      type: String,
        label: "The image for this post.",
        defaultValue: ""
    },
    "faves": {
        type: Number,
        label: "The number of faves.",
        defaultValue: 0
    }
});

Posts.attachSchema( PostsSchema );