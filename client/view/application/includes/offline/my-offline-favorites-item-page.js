///**
// * Created by jesseeikema on 6/5/15.
//// */
//Template.myFavoritesItemPage.helpers({
//    //project: function() {
//    //    var currentPostID = JSON.stringify(Router.current().params.id);
//    //    var currentUserId = JSON.stringify(Router.current().params.userID);
//    //    //return proxyDB.mimoaUsersFavoritesCollection.find({'project.id':currentPostID});
//    //    console.log(currentPostID,currentUserId);
//    //    //return proxyDB.mimoaUsersFavoritesCollection.find({'project.id': currentPostID});
//    //    return proxyDB.mimoaUsersFavoritesCollection.findOne({'userID': currentUserId, 'project.id':currentPostID});
//    //}
//});

var directionService;
var myCurrentLocation;
var myCurrentDestination;
var directionsDisplay;

Meteor.startup(function(){
    function success(pos) {
        var crd = pos.coords;
        currentLat = crd.latitude;
        currentLng = crd.longitude;
    }
    function error(err) {
        console.log(err);
    }
    navigator.geolocation.getCurrentPosition(success, error);
});
Template.myOfflineFavoritesItemPage.helpers({
    offline:function(){
        var currentPostID = JSON.stringify(Router.current().params.id);
        //console.log(currentPostID,foo.findOne({'project.project.id':currentPostID}).fetch());

    }
});

Template.favoritePostPageMap.onCreated(function() {
    GoogleMaps.ready('exampleMap', function(map) {
        return directionsDisplay.setMap(map.instance);
    });
});