var subHandle;
var currentLat;
var currentLng;
var hereBrowser;
var currentLocation;
var objectLocation;
var distanceToLocation;
var currentPostID;
Template.postsList.rendered = function() {

};
Template.postsList.helpers({
    templateGestures: {
        'swiperight .post': function (event, templateInstance) {
            /* ... */
            console.log('you swiped ' + this.title);

        }
    },
    status: function(){
        //Meteor.setInterval(function(){
        //    Session.set('active', false);
        //},7000);
        //var currentActive = Session.get('active');
        //window.onscroll = function() {
        //    Session.set('active', true);
        //    console.log(currentActive);
        //};
        //if(currentActive == false){
        //    console.log('idle');
        //    $('.account').css('height','50px');
        //    $('.nav').css('height', '60px');
        //    $('.post-list').css('margin-top','60px');
        //    $('.post-list').css('margin-bottom','60px');
        //} else if(currentActive == true){
        //    console.log('not idle');
        //    //$('.post-list').css('margin-bottom','40px');
        //    $('.post-list').css('margin-top','0');
        //    $('.account').css('height','30px');
        //    //$('.nav').css('height', '40px')
        //}
    },
    posts: function() {
        return proxyDB.mimoaCollection.find({},{thumb:1,lon:1,lat:1,freetext2:1,freeint1:1,title:1});
    },
    currentDistance: function() {
        var hereBrowser = Geolocation.currentLocation();
        if(hereBrowser != null){
            if(GoogleMaps.loaded()){
                currentLocation = new google.maps.LatLng(hereBrowser.coords.latitude, hereBrowser.coords.longitude);
                objectLocation = new google.maps.LatLng(this.lat[0],this.lon[0]);
                distanceToLocation = JSON.parse((google.maps.geometry.spherical.computeDistanceBetween(currentLocation, objectLocation)).toFixed(0));
                return distanceToLocation;
            }
        }
    }
});
Template.postsList.events({
   'click div.favorite-icon':function(){
       var projectId = this._id;
       var thisProject = this;
       var currentUserId = Meteor.userId();
       console.log(projectId,thisProject,currentUserId);
       return Meteor.call('addToMyFavorite',projectId, thisProject, currentUserId, function(err,results){
           console.log('add to my favorites');
          if(err){console.log(err);}else{console.log(results);}
       });
   }
});