/**
 * Created by jesse on 18/02/15.
 */
Meteor.reactivePublish('mimoacollection', function(currentLat,currentLng, limit){
    return proxyDB.mimoaCollection.find({coordinates:
        {$near:
            {$geometry:
                {type: "Point",coordinates:[currentLng, currentLat]}
            }
        }
    },{limit:limit}, {reactive:true});
});
Meteor.publish('mimoacollectionspecificsearch', function(currentPostID){
    return proxyDB.mimoaCollection.find({'id': currentPostID});
});
Meteor.publish('mimoacollectionspecific', function(currentPostID){
    return proxyDB.mimoaCollection.find({'title':{$elemMatch : {$regex:currentPostID, $options: "i"}}});
});
Meteor.publish('myfavorites', function(currentUserId){
});
Meteor.publish('myfavoritesofflinespecific', function(currentPostID){
    return foo.find({'project.project.id': currentPostID});
});
Meteor.publish('myfavoritesoffline', function(currentUserId,currentLng,currentLat){
    return foo.find({'userID': currentUserId},{coordinates:
        {$near:
            {$geometry:
                {type: "Point",coordinates:[currentLng, currentLat]}
            }
        }
    });
});
Meteor.publish('myfavoritesofflinelist', function(currentUserId){
    return foolist.find({'userID': currentUserId});
});
Meteor.publish('myfavoritesofflinelisting', function(currentUserId,listName){
    return foo.find({'userID': currentUserId,name:listName});
});
Meteor.publish('myfavoritesofflinelistitems', function(currentUserId){
    return foo.find({'userID': currentUserId});
});
Meteor.publish('mimoacuratorscollection', function(currentUserId){
    return proxyDB.mimoaCuratorsCollection.find({userID:currentUserId});
});
Meteor.publish('mimoauserscollection', function(currentUserId) {
    return proxyDB.mimoaUsersCollection.find({userID: currentUserId});
});
Meteor.publish('mimoauserscollectionlist', function() {
    return proxyDB.mimoaUsersCollection.find();
});
Meteor.publish('mimoausersfavoritescollection', function(currentUserId, currentPostID){
    if(currentPostID != null){
       return proxyDB.mimoaUsersFavoritesCollection.find({userID:currentUserId,id:currentPostID});
    }else{
       return proxyDB.mimoaUsersFavoritesCollection.find({userID:currentUserId});
    }
});
Meteor.publish('mimoamyfavorites', function(curatorID){
    return proxyDB.mimoaMyFavoritesCollection.find(curatorID);
});
