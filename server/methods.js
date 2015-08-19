/**
 * Created by jesseeikema on 3/30/15.
 */
foolist = new Mongo.Collection('myfavoritesofflinelist');
foo = new Mongo.Collection('myfavoritesoffline');

Meteor.methods({
    'createFavList':function(listName,currentUserId){
        return foolist.update({name:listName,userID:currentUserId},{name:listName,userID:currentUserId},{upsert:true});
    },
    'offlineAvailable':function(foolistName,thisProject,currentUserId){
        return foo.update(
            {
                name:foolistName,userID:currentUserId, 'project.id':'thisProject.id'
            },{
                name:foolistName,
                userID:currentUserId,
                project:thisProject
            },{
                upsert:true
            });

    },
    'saveDB':function(subHandle){
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
    'removeOfflineList':function(thisList){
        foo.update({name:thisList},{$unset:{name:thisList}});
        return foolist.remove(thisList);
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
