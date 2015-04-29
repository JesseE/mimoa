/**
 * Created by jesse on 18/02/15.
 */
Meteor.publish('mimoacollection', function(country, city, limit){
    return proxyDB.mimoaCollection.find({country:country,city:city},{limit:limit});
});
//Meteor.publish('mimoaCommentsCollection', function(limit){
//    return proxyDB.mimoaCommentsCollection.find({},{limit:limit});
//});