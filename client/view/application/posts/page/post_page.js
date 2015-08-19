/**
 * Created by jesse on 20/02/15.
 */
var projectsIndex = [];
var currentIndex = {};
var ratingValue = [];
var nextItem = {};
var prevItem = {};

Template.postPage.helpers({
    website:function(){
        var str = this.website[0];
        if( str.indexOf('http://www.') >= 0){
            return str;
        } else{
            var newStr;
            newStr = str.replace('www.', 'http://www.');
            return newStr;
        }
    },
    currentDistance: function() {
        var hereBrowser = Geolocation.currentLocation();
        currentLocation = new google.maps.LatLng(hereBrowser.coords.latitude, hereBrowser.coords.longitude);
        objectLocation = new google.maps.LatLng(this.lat[0],this.lon[0]);
        distanceToLocation = /*JSON.parse(*/(google.maps.geometry.spherical.computeDistanceBetween(currentLocation, objectLocation)).toFixed(0)/*)*/;
        return distanceToLocation;
    },
    description: function() {
        var description = [this.imagedescription, this.title];
        console.log(description);
        return description;
    },
    list:function(){
        return foolist.find({userID:Meteor.userId()});
    }
});
Template.postPage.events({
    'click .tooltip__remove-page': function(){
        $('.tooltip-post-page').hide();
    },
    'click .post--list-create-tooltip':function(){
        var userID = Meteor.userId();
        return Router.go('/profile/'+userID+'/create');
    },

    'click .add-to-favorite':function(){
        currentProject = this;
        $('.tooltip-post-page').show();
    },
    'click .tooltip-post-text':function(event, template){
        var text = $(event.target).text().replace(/\s+/g, '');
        var foolistName = text;
        console.log(foolistName);
        var projectId = currentProject._id;
        var thisProject = currentProject;
        console.log(currentProject);
        var currentUserId = Meteor.userId();
        $('.tooltip-post-page').hide();
        return Meteor.call('offlineAvailable',foolistName,thisProject,currentUserId,function(err,res){
            if(err){throw err;} else{ }
        });
    },
    'click .post-content__title-photo-item': function() {
        var elem = document.getElementById("myCarousel");
        console.log(elem.requestFullscreen);
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    },
    'tap .post-content__title-photo-item': function() {
        var elem = document.getElementById("myCarousel");
        console.log(elem.requestFullscreen);
        console.log('tapped that');
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    },
    'click button.remove-project': function() {
        var thisPost = this;
        Meteor.call('removeProject', thisPost, function(err, result) {
            if(result) {
                console.log(result);
                Router.go('postsList');
            }
        });
    },
    'click .rating-icon-1' : function() {
        ratingValue = [];
        $('div#rating').removeClass();
        $('div#rating').addClass('rating-1');
        var currentRatingValue = 1;
        var selectedDoc = this._id;
        ratingValue.push(currentRatingValue);
        return Meteor.call('updateRating', selectedDoc, ratingValue, function(err, result){
            if(result){
                console.log(result);
            }
        });
    },
    'click .rating-icon-2' : function() {
        ratingValue = [];
        $('div#rating').removeClass();
        $('div#rating').addClass('rating-2');
        var currentRatingValue = 2;
        var selectedDoc = this._id;
        ratingValue.push(currentRatingValue);
        return Meteor.call('updateRating', selectedDoc, ratingValue, function(err, result){
            if(result){
                console.log(result);
            }
        });
    },
    'click .rating-icon-3' : function() {
        ratingValue = [];
        $('div#rating').removeClass();
        $('div#rating').addClass('rating-3');
        var currentRatingValue = 3;
        var selectedDoc = this._id;
        ratingValue.push(currentRatingValue);
        return Meteor.call('updateRating', selectedDoc, ratingValue, function(err, result){
            if(result){
                console.log(result);
            }
        });
    },
    'click .rating-icon-4' : function() {
        ratingValue = [];
        $('div#rating').removeClass();
        $('div#rating').addClass('rating-4');
        var currentRatingValue = 4;
        var selectedDoc = this._id;
        ratingValue.push(currentRatingValue);
        return Meteor.call('updateRating', selectedDoc, ratingValue, function(err, result){
            if(result){
                console.log(result);
            }
        });

    },
    'click .rating-icon-5' : function() {
        ratingValue = [];
        $('div#rating').removeClass();
        $('div#rating').addClass('rating-5');
        var currentRatingValue = 5;
        var selectedDoc = this._id;
        ratingValue.push(currentRatingValue);
        return Meteor.call('updateRating', selectedDoc, ratingValue, function(err, result){
            if(result){
                console.log(result);
            }
        });
    }
});

Template.postPage.rendered = function(){
    window.scrollTo(0,0);
    $('div.item').first().addClass('active');
};