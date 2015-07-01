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
Meteor.publish('mimoacollectionspecificsearch', function(currentPostID){
    return proxyDB.mimoaCollection.find({'id': currentPostID});
});
Meteor.publish('mimoacollectionspecific', function(currentPostID){
    return proxyDB.mimoaCollection.find({'title':{$elemMatch : {$regex:currentPostID, $options: "i"}}});
    //if( proxyDB.mimoaCollection.find({'title':currentPostID}) == undefined){
    //
    //}else{
    //    return proxyDB.mimoaCollection.find({'title':currentPostID});
    //}
    //if(proxyDB.mimoaCollection.findOne({'freetext8.[0]._':currentPostID}) == undefined){
    //
    //}else{
    //    return proxyDB.mimoaCollection.find({'freetext8.[0]._':currentPostID});
    //}
    //if( proxyDB.mimoaCollection.find({'city':currentPostID}) == undefined){
    //
    //}else{
    //    return proxyDB.mimoaCollection.find({'city':currentPostID});
    //}
    //proxyDB.mimoaCollection.findOne({'freetext8.[0]._':JSON.stringify(currentPostID)});
    //proxyDB.mimoaCollection.find({'id':currentPostID});
    //proxyDB.mimoaCollection.find({'city':currentPostID});
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
