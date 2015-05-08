/**
 * Created by jesse on 18/02/15.
 */
Meteor.publish('mimoacollection', function(currentLat,currentLng, limit){
    return proxyDB.mimoaCollection.find({coordinates:
        {$near:
            {$geometry:
                {type: "Point",coordinates:[currentLng, currentLat]}
                    //$maxDistance:4000
            }
        }
    },{limit:limit});
});
//
//Meteor.publish('mimoacollection', function(country, city, limit){
//    return proxyDB.mimoaCollection.find({country:country,city:city});
//});
//Meteor.publish('mimoaCommentsCollection', function(limit){
//    return proxyDB.mimoaCommentsCollection.find({},{limit:limit});
//});

