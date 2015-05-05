/**
 * Created by jesseeikema on 3/30/15.
 */
Meteor.methods({
    'updateRating': function(selectedDoc, ratingValue){
        return proxyDB.mimoaCollection.update({ _id: selectedDoc }, { $set : { freeint1 : { 0 : { _ : ratingValue } } } });
    },
    'searchProject': function(projectTitle){
        return proxyDB.mimoaCollection.find({title: projectTitle});
    },
    'addNewProject': function(post){
        return proxyDB.mimoaCollection.insert(post);
    },
    'removeProject': function(thisPost){
        return proxyDB.mimoaCollection.remove(thisPost);
    },
    'removeComment': function(postId){
        return proxyDB.mimoaCommentsCollection.remove(postId);
    },
    comments: function(commentAttributes) {
        return proxyDB.mimoaCommentsCollection.insert(commentAttributes);
    }
    //'getCurrentCoords': function(currentLat, currentLng){
    //    //Meteor.publish('mimoacollection', function(currentCoords){
    //    console.log(currentLng,currentLat);
    //        return proxyDB.mimoaCollection.find({
    //            coordinates: {$near:
    //            {$geometry:
    //            {type: "Point",coordinates:[currentLng, currentLat]},
    //                $maxDistance:4000}}}    );
    //   // });
    //}

});