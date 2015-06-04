/**
 * Created by jesse on 18/02/15.
 */
myFavorites = new Mongo.Collection('myfavorites');
if(Meteor.isCordova){ Ground.Collection(myFavorites);}

//offlineMimoaCollection = new Meteor.Collection('offlineMimoa');
//if(Meteor.isCordova){ Ground.Collection(offlineMimoaCollection);}

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
//Meteor.publish('mimoacollection', function(country, city, limit){
//    return proxyDB.mimoaCollection.find({country:country,city:city});
//});
//Meteor.publish('mimoaCommentsCollection', function(limit){
//    return proxyDB.mimoaCommentsCollection.find({},{limit:limit});
//});

//offline collection
//Meteor.publish('offlinemimoa', function(postId){
//   return proxyDB.mimoaCollection.find({id:postId});
//});