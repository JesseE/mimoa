Posts = new Meteor.Collection('posts');

ownsDocument = function(userId, doc) {
    return doc && doc.userId === userId;
};

Posts.allow({
    insert: function(userId, doc){
       return !! userId;
    },
    update: function(userId, doc){
        return !! userId;
    },
    remove: ownsDocument()
});
Posts.deny({
    update: function(userId, post, fieldNames) {
         // may only edit the following two fields
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});