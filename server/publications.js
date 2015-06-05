/**
 * Created by jesse on 18/02/15.
 */
myFavorites = new Mongo.Collection('myfavorites');
Ground.Collection(myFavorites);

Meteor.reactivePublish('mimoacollection', function(currentLat,currentLng, limit){
    return proxyDB.mimoaCollection.find({coordinates:
        {$near:
            {$geometry:
                {type: "Point",coordinates:[currentLng, currentLat]}
            }
        }
    },{limit:limit}, {reactive:true});
});
Meteor.publish('myfavorites', function(){
    return myFavorites.find();
});
Meteor.publish('mimoauserscollection', function(currentUserId) {
    return proxyDB.mimoaUsersCollection.find({userID: currentUserId});
});
Meteor.publish('mimoausersfavoritescollection', function(currentUserId){
   return proxyDB.mimoaUsersFavoritesCollection.find({userID:currentUserId});
});
Meteor.publish('mimoaCuratorsCollection', function(){
    return proxyDB.mimoaCuratorsCollection.find();
});
//offline collection
//Meteor.publish('offlinemimoa', function(postId){
//   return proxyDB.mimoaCollection.find({id:postId});
//});