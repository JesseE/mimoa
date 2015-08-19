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
//
//var directionService;
//var myCurrentLocation;
//var myCurrentDestination;
//var directionsDisplay;
//
//Meteor.startup(function(){
//    function success(pos) {
//        var crd = pos.coords;
//        currentLat = crd.latitude;
//        currentLng = crd.longitude;
//    }
//    function error(err) {
//        console.log(err);
//    }
//    navigator.geolocation.getCurrentPosition(success, error);
//});
Template.myOfflineFavoritesItemPage.helpers({
//    offline:function(){
//        var currentPostID = JSON.stringify(Router.current().params.id);
//        //console.log(currentPostID,foo.findOne({'project.project.id':currentPostID}).fetch());
//
//    }
    currentDistance: function() {
        var hereBrowser = Geolocation.currentLocation();
        currentLocation = new google.maps.LatLng(hereBrowser.coords.latitude, hereBrowser.coords.longitude);
        objectLocation = new google.maps.LatLng(this.project.lat[0],this.project.lon[0]);
        distanceToLocation = /*JSON.parse(*/(google.maps.geometry.spherical.computeDistanceBetween(currentLocation, objectLocation)).toFixed(0)/*)*/;
        return distanceToLocation;
    }
});
Template.myOfflineFavoritesItemPage.rendered = function(){
    window.scrollTo(0,0);
};
//
//Template.favoritePostPageMap.onCreated(function() {
//    GoogleMaps.ready('exampleMap', function(map) {
//        return directionsDisplay.setMap(map.instance);
//    });
//});
