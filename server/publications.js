/**
 * Created by jesse on 18/02/15.
 */

//Meteor.publish('allPosts', function(){
//    return Posts.find();
//});
//
//Meteor.publish('comments', function(){
//    return Comments.find();
//});


Meteor.publish('mimoacollection', function(limit){
    // current user location?
    //return proxyDB.mimoaCollection.find({city:'Amsterdam',country:'Netherlands'},
    //    {limit:limit});
    return proxyDB.mimoaCollection.find({city: 'Amsterdam'},{limit:limit});
});
Meteor.publish('mimoaCommentsCollection', function(){
    return proxyDB.mimoaCommentsCollection.find();
});