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
    // limit the amount of data loaded?
    return proxyDB.mimoaCollection.find({city:'Amsterdam'},{limit:limit});
});


Meteor.methods({
    'updateRating': function(selectedDoc, ratingValue){
        proxyDB.mimoaCollection.update({ _id: selectedDoc }, { $set : { freeint1 : {0 : { _ : ratingValue } } } });
    },
    'searchProject': function(projectTitle){
        console.log(projectTitle);
        proxyDB.mimoaCollection.find({title: projecttitle});
    }
});