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
    'click .post':function(){
        //$(this).addClass('animated fadeOutLeft');
        //$(event.target).addClass('animate-to-top');
    },
    'click .tooltip-post-text':function(event, template){
        var text = $(event.target).text().replace(/\s+/g, '');
        var foolistName = text;
        console.log(foolistName);
        var projectId = currentProject._id;
        var thisProject = currentProject;
        console.log(currentProject);
        var currentUserId = Meteor.userId();
        $(event.target.parentElement.parentElement).removeClass('fadeIn');
        $(event.target.parentElement.parentElement).addClass('fadeOut');
        return Meteor.call('offlineAvailable',foolistName,thisProject,currentUserId,function(err,res){
            if(err){throw err;} else{ }
        });
    },
   'click .favorite-icon':function(event, template){
       currentProject = this;
       console.log('clicked',$(event.target));
       $(event.target.nextElementSibling).show();
       $(event.target.nextElementSibling).addClass('fadeIn');
       //$(this).$('.tooltip-post').show();
       //$(this).$('.tooltip-post').addClass('animated fadeIn');
       //$(event.target.nextElementSibling).show();
       //$(event.target.nextElementSibling).addClass('animated fadeIn');
       ////Meteor.setTimeout(function(){
       //    $(event.target.nextElementSibling).removeClass('animated fadeIn');
       //    $(event.target.nextElementSibling).addClass('animated fadeOut');
       //},2000);
       //$(event.target.parentElement).removeClass("favorite-icon");
       //$(event.target.parentElement).addClass("fa--pressed");



       //return proxyDB.mimoaUsersFavoritesCollection.find({userID:Meteor.userId()}).forEach(function (project) {
       //    return Meteor.call('offlineAvailable', project, function(err, res){
       //        if(err){throw err;} else{ console.log(res);}
       //    });
       //});
       //return Meteor.call('addToMyFavorite',projectId, thisProject, currentUserId, function(err,results){
       //    console.log('add to my favorites');
       //   if(err){console.log(err);}else{console.log(results);}
       //});

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
    'click .post--list-create':function(){
        $('.post-container').addClass('animated fadeOutLeft');
        $('.new-list').show();
        $('.new-list').addClass('animated fadeInRight');
    }
});