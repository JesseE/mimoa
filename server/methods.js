/**
 * Created by jesseeikema on 3/30/15.
 */
Meteor.methods({
    'updateRating': function(selectedDoc, ratingValue){
        return proxyDB.mimoaCollection.update({ _id: selectedDoc }, { $set : { freeint1 : {0 : { _ : ratingValue } } } });
    },
    'searchProject': function(projectTitle){
        return proxyDB.mimoaCollection.find({title: projectTitle});
    },
    'addNewProject': function(post){
        return proxyDB.mimoaCollection.insert(post);
    },
    'removeProject': function(thisPost){
        return proxyDB.mimoaCollection.remove(thisPost);
    }
});


//SearchSource.defineSource('mimoacollection', function(searchText, options) {
//    var options = {sort: {title: 1}};
//
//    if(searchText) {
//        var regExp = buildRegExp(searchText);
//        var selector = {title: regExp};
//        return proxyDB.mimoaCollection.find(selector, options).fetch();
//    } else {
//        return proxyDB.mimoaCollection.find({}, options).fetch();
//    }
//});
//
//function buildRegExp(searchText) {
//    // this is dumb implementation
//    var parts = searchText.trim().split(' ');
//    return new RegExp("(" + parts.join('|') + ")", "ig");
//}