/**
 * Created by jesse on 18/02/15.
 */
Meteor.publish('mimoacollection', function(limit){
    return proxyDB.mimoaCollection.find({city: 'Amsterdam'},{limit:limit});
});
Meteor.publish('mimoaCommentsCollection', function(limit){
    return proxyDB.mimoaCommentsCollection.find({},{limit:limit});
});