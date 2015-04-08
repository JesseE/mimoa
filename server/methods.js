/**
 * Created by jesseeikema on 3/30/15.
 */
Meteor.methods({
    'updateRating': function(selectedDoc, ratingValue){
        return proxyDB.mimoaCollection.update({ _id: selectedDoc }, { $set : { freeint1 : { 0 : { _ : ratingValue } } } });
    },
    'searchProject': function(projectTitle){
        return proxyDB.mimoaCollection.find({title: projectTitle});
    },
    'addNewProject': function(post){
        return proxyDB.mimoaCollection.insert(post);
    },
    'removeProject': function(thisPost){
        return proxyDB.mimoaCollection.remove(thisPost);
    },
    'removeComment': function(postId){
        return proxyDB.mimoaCommentsCollection.remove(postId);
    },
    comments: function(commentAttributes) {
        //var user = Meteor.user();
        //var post = proxyDB.mimoaCollection.findOne(commentAttributes.postId);

        //if(!user){
        //    throw new Meteor.Error(401, "You need to login to leave a comment");
        //}
        //if(!commentAttributes.body){
        //    throw new Meteor.Error(422, "Please write some content");
        //}
        //if(!commentAttributes.postId){
        //    throw new Meteor.Error(422, "You must comment on a post");
        //}
        //comment = _.extend(_.pick(commentAttributes, "postId","body"), {
        //    //userId: user._id,
        //    //author: user.username,
        //    submitted: new Date().getTime()
        //});

        //return proxyDB.mimoaCollection.insert(comment);
        return proxyDB.mimoaCommentsCollection.insert(commentAttributes);
    }
});