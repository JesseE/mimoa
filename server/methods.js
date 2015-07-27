/**
 * Created by jesseeikema on 3/30/15.
 */
foo = new Mongo.Collection('myfavoritesoffline');
Meteor.methods({
    'offlineAvailable':function(project){
        //console.log(project.project._id);
        //console.log(project._id);
        console.log(foo.find().fetch());
        return foo.update({_id:project._id},{project:project},{upsert:true});
    },
    'saveDB':function(subHandle){
        //return proxyDB.mimoaCollection.update()
    },
    'updateRating': function(selectedDoc, ratingValue){
        return proxyDB.mimoaCollection.update({ _id: selectedDoc }, { $set : { freeint1 : { 0 : { _ : ratingValue } } } });
    },
    'searchProject': function(currentPostID){
        return proxyDB.mimoaCollection.find({'title':{$regex : currentPostID, $options: "i"}}, {
            id:1,title:1,address:1,website:1,freeint1:1,freetext2:1,freetext3:1,freetext8:1,freetext9:1,lon:1,lat:1,thumb:1,image1:1,imageset:1,imagedescription:1,summary:1
        });
    },
    'searchProjectByCountry':function(currentPostID){
        return proxyDB.mimoaCollection.find({'country':{$regex : currentPostID, $options: "i"}}, {
            id:1,title:1,address:1,website:1,freeint1:1,freetext2:1,freetext3:1,freetext8:1,freetext9:1,lon:1,lat:1,thumb:1,image1:1,imageset:1,imagedescription:1,summary:1
        });
    },
    'searchProjectByCity':function(currentPostID){
        return proxyDB.mimoaCollection.find({'city':{$regex : currentPostID, $options: "i"}}, {
            id:1,title:1,address:1,website:1,freeint1:1,freetext2:1,freetext3:1,freetext8:1,freetext9:1,lon:1,lat:1,thumb:1,image1:1,imageset:1,imagedescription:1,summary:1
        });
    },
    'searchProjectByArchitect':function(currentPostID){
        return proxyDB.mimoaCollection.find({'freetext8.[0]._':currentPostID});
    },
    'searchProjectById': function(currentPostID){
        return proxyDB.mimoaCollection.find({id:currentPostID});
    },
    'addNewProject': function(post){
        return proxyDB.mimoaCollection.insert(post);
    },
    'removeProject': function(thisPost){
        return proxyDB.mimoaCollection.remove(thisPost);
    },
    'removeOfflineProject': function(thisPost){
        return foo.remove(thisPost);
    },
    'removeComment': function(postId){
        return proxyDB.mimoaCommentsCollection.remove(postId);
    },
    'comments': function(commentAttributes) {
        return proxyDB.mimoaCommentsCollection.insert(commentAttributes);
    },
    'addCuratorToMyFavorite': function(currentUserId, thisCurator){
        return proxyDB.mimoaCuratorsCollection.update({userID:currentUserId,curator:thisCurator},
            {
                userID:currentUserId,
                curator:thisCurator
            },{upsert:true});
    },
    'addToMyFavorite': function(projectId, thisProject, currentUserId){
        return proxyDB.mimoaUsersFavoritesCollection.update({userID:currentUserId, 'project.id':'thisProject.id'},
            {
                userID:currentUserId,
                project:thisProject
            }, {upsert:true});
    },
    'removeCuratorFromMyFavorite':function(thisCurator, thisUserID){
        return proxyDB.mimoaCuratorsCollection.remove({userID:thisUserID,'curator.userID':thisCurator.curator.userID});
    },
    'removeFavoriteProject': function(thisPost){
        return proxyDB.mimoaUsersFavoritesCollection.remove(thisPost);
    },
    'signUp': function(currentUserId, user) {
        proxyDB.mimoaUsersCollection.find({userID:currentUserId});
        return proxyDB.mimoaUsersCollection.update({userID:currentUserId},{userID:currentUserId,user:user},{upsert:true});
    }
});