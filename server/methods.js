/**
 * Created by jesseeikema on 3/30/15.
 */
Meteor.methods({
    'updateRating': function(selectedDoc, ratingValue){
        return proxyDB.mimoaCollection.update({ _id: selectedDoc }, { $set : { freeint1 : { 0 : { _ : ratingValue } } } });
    },
    'searchProject': function(projectTitle){
        return proxyDB.mimoaCollection.find({title: projectTitle}, {
            id:1,title:1,address:1,website:1,freeint1:1,freetext2:1,freetext3:1,freetext8:1,freetext9:1,lon:1,lat:1,thumb:1,image1:1,imageset:1,imagedescription:1,summary:1
        },{limit:1});
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
        return proxyDB.mimoaCommentsCollection.insert(commentAttributes);
    },
    'addToMyFavorite': function(projectId, thisProject, currentUserId){
        console.log(currentUserId);
        return proxyDB.mimoaUsersFavoritesCollection.update({userID:currentUserId,_id: projectId},
            {
                userID:currentUserId,
                project:thisProject
            }, {upsert:true});
    },
    'removeFavoriteProject': function(thisPost){
        return proxyDB.mimoaUsersFavoritesCollection.remove(thisPost);
    },
    'signUp': function(currentUserId) {
        console.log(currentUserId);
        return proxyDB.mimoaUsersCollection.update({userID:currentUserId},{userID:currentUserId},{upsert:true});
        //return proxyDB.mimoaUsersCollection.update({users:user.email},{users:userAccount}, {upsert: true});
    }
});