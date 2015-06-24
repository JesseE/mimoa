/**
 * Created by jesse on 18/02/15.
 */
myFavorites = new Mongo.Collection('myfavorites');

Meteor.reactivePublish('mimoacollection', function(currentLat,currentLng, limit){
    return proxyDB.mimoaCollection.find({coordinates:
        {$near:
            {$geometry:
                {type: "Point",coordinates:[currentLng, currentLat]}
            }
        }
    },{limit:limit}, {reactive:true});
});
Meteor.publish('mimoacollectionspecific', function(currentPostID){
    proxyDB.mimoaCollection.find({'title':currentPostID});
    proxyDB.mimoaCollection.find({'freetext8':currentPostID});
    return proxyDB.mimoaCollection.find({'id':currentPostID});
});
Meteor.publish('myfavorites', function(){
    return myFavorites.find();
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
    Sortable.collections = 'mimoaUsersFavoritesCollection';
    if(currentPostID != null){
       Sortable.collections = 'mimoausersfavoritescollection';
       return proxyDB.mimoaUsersFavoritesCollection.find({userID:currentUserId,id:currentPostID});
    }else{
       Sortable.collections = 'mimoausersfavoritescollection';
       return proxyDB.mimoaUsersFavoritesCollection.find({userID:currentUserId});
    }
});
Meteor.publish('mimoamyfavorites', function(curatorID){
    return proxyDB.mimoaMyFavoritesCollection.find(curatorID);
});
