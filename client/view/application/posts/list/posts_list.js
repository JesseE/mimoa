var subHandle;
var currentLat;
var currentLng;

Meteor.startup(function(){
    var options = {enableHighAccuracy: false};
    function success(position) {
        apiKey = 'AIzaSyCHm1lpUrl8t-6qHQ-16X39ZTNt1ocHmkM';
        crd = position.coords;
        currentLat = crd.latitude;
        currentLng = crd.longitude;
        currentCoords = [currentLng,currentLat];
        subHandle = Meteor.subscribeWithPagination('mimoacollection', currentLat, currentLng, 25);
    }
    function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
    }
    if(navigator.geolocation){
        return navigator.geolocation.getCurrentPosition(success, error, options);
    }
    function onDeviceReady() {
        return navigator.geolocation.getCurrentPosition(success, error);
    }
    $(function(){
        document.addEventListener("deviceready", onDeviceReady, true);
    });
});
//window.onscroll = function(ev) {
//    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
//        Meteor.setTimeout(function() {
//            return subHandle.loadNextPage();
//        },1000);
//    }
//};
Template.postsList.helpers({
    posts: function() {
        //make it realtime updating collection system
        //var hereBrowser = Geolocation.currentLocation();
        //currentLat = hereBrowser.coords.latitude;
        //currentLng = hereBrowser.coords.longitude;
        //subHandle = Meteor.subscribeWithPagination('mimoacollection', currentLat, currentLng, 25);
        return proxyDB.mimoaCollection.find({},{thumb:1,lon:1,lat:1,freetext2:1,freeint1:1,title:1});
    }
});

Template.postsList.rendered = function(){
};
Template.postsList.events({
   'click button.loadbutton':function(){
       return subHandle.loadNextPage();
   },
   'click div.favorite-icon':function(){
       var projectId = this._id;
       var thisProject = this;
       var currentUserId = Meteor.userId();
       return Meteor.call('addToMyFavorite',projectId, thisProject, currentUserId, function(err,results){
           console.log('add to my favorites');
          if(err){console.log(err);}else{console.log(results);}
       });
   }
});