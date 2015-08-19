var subHandle;
var currentLat;
var currentLng;
var hereBrowser;
var currentLocation;
var objectLocation;
var distanceToLocation;
var currentPostID;
var currentProject;
Template.postsList.rendered = function() {
    var toolbox = $('.tooltip-post'),
        height = toolbox.height(),
        scrollHeight = toolbox.get(0).scrollHeight;

    toolbox.bind('mousewheel', function(e, d) {
        if((this.scrollTop === (scrollHeight - height) && d < 0) || (this.scrollTop === 0 && d > 0)) {
            e.preventDefault();
        }
    });
};
// Extended configuration
Template.postsList.helpers({
    status: function(){
    },
    list:function(){
      return foolist.find({userID:Meteor.userId()});
    },
    posts: function() {
        return proxyDB.mimoaCollection.find({},{thumb:0,image1:1,lon:1,lat:1,freetext2:1,freeint1:1,title:1, coordinates:1,imageset:1});
    },
    currentDistance: function() {
        var hereBrowser = Geolocation.currentLocation();
        currentLocation = new google.maps.LatLng(hereBrowser.coords.latitude, hereBrowser.coords.longitude);
        objectLocation = new google.maps.LatLng(this.lat[0],this.lon[0]);
        distanceToLocation = /*JSON.parse(*/(google.maps.geometry.spherical.computeDistanceBetween(currentLocation, objectLocation)).toFixed(0)/*)*/;
        return distanceToLocation;
    }

});
Template.postsList.events({
    'click .tooltip__remove': function(){
        $('.tooltip-post').hide();
    },
    'click .post--list-create-tooltip':function(){
        var userID = Meteor.userId();
        return Router.go('/profile/'+userID+'/create');
    },
    'click .tooltip-post-text':function(event, template){
        var text = $(event.target).text().replace(/\s+/g, '');
        var foolistName = text;
        var projectId = currentProject._id;
        var thisProject = currentProject;
        var currentUserId = Meteor.userId();
        Meteor.call('offlineAvailable',foolistName,thisProject,currentUserId,function(err,res){
            if(err){throw err;} else{ }
        });
        $(event.target.parentElement.parentElement).removeClass('fadeIn');
        $(event.target.parentElement.parentElement).addClass('fadeOut');
    },
   'click .favorite-icon':function(event, template){
       currentProject = this;
       console.log('clicked',$(event.target));
       $(event.target.nextElementSibling).show();
   },
    'submit form': function(event){
        event.preventDefault();
        var currentUserId = Meteor.userId();
        var listName = event.target.listNameInput.value;
        Meteor.call('createFavList',listName,currentUserId,function(err,res){
            if(err){throw err;} else{console.log(foolist.find().fetch());}
        });
        $('.new-list').removeClass('fadeInRight');
        $('.new-list').addClass('fadeOutLeft');
        $('.post-container').removeClass('fadeOutLeft');
        $('.post-container').addClass('fadeInRight');

    }
});