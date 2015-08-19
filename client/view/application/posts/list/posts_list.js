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
    //templateGestures: {
    //    'swiperight .post': function (event, templateInstance) {
    //        /* ... */
    //        console.log('you swiped ' + this.title);
    //
    //    }
    //},
    status: function(){
        //if(Meteor.status().connected == false){
        //    alert('you are disconnected now there is only a limited amout of projects');
        //}else if(Meteor.status().connected == true){
        //    console.log('your online');
        //}
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
        //console.log($(event.target.parentElement.parentElement));
        //$(event.target).hide();
        //$('.tooltip-post').removeClass('fadeIn');
        //$('.tooltip-post').addClass('fadeOut');
        //$(event.target.nextElementSibling).show();
        $('.tooltip-post').hide();
        //$('.tooltip-post-page').removeClass('fadeIn');
    },
    'click .tooltip-post-text .post--list-create-tooltip':function(){
        var userID = Meteor.userId();
        return Router.go('/profile/'+userID+'/create');
        //$(this).addClass('animated fadeOutLeft');
        //$(event.target).addClass('animate-to-top');
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
    //   $(event.target.nextElementSibling).addClass('fadeIn');
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

    },
    'click .post--list-create-tooltip':function(){

    }
});