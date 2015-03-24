/**
 * Created by jesse on 18/02/15.
 */

Meteor.publish('allPosts', function(){
    return Posts.find();
});

Meteor.publish('comments', function(){
    return Comments.find();
});

Meteor.publish('mimoacollection', function(limit){
    // current user location?
    // limit the amount of data loaded?
    return proxyDB.mimoaCollection.find({city: 'Amsterdam'},{limit:limit},{
        $near: {
            $geometry: {
               type: 'Point',
                coordinates: [52.347810499999994, 4.849997699999999]
            },
            $maxDistance: 1400,
            $minDistance: 0
        }
    });
});
