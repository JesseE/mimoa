/**
 * Created by jesse on 20/02/15.
 */
var ratingValue = [];
Template.postPage.helpers({
    mapOptions: function() {
        var here = Geolocation.currentLocation();
        if(GoogleMaps.loaded()) {
            var mimoaIcon = 'http://mimoa.eu/map/img/focus1.png';
            // Map initialization options;
            currentLocation = new google.maps.LatLng(here.coords.latitude, here.coords.longitude);
            return {
                center: currentLocation,
                zoom: 13,
                icon: mimoaIcon,
                draggable: true,
                disableDefaultUI: true
            };
        }
    },
    shareData: function() {
        return {
            title: this.title,
            summary: this.summary,
            image : this.image1
        }
    },
    website: function(){
        if(this.website[0] == ""){
            return false;
        } else{
            return this.website;
        }
    }
});
Template.postPage.events({
    'click div.add-to-favorite':function(){
        var projectId = this._id;
        var thisProject = this;
        var currentUserId = Meteor.userId();
        return Meteor.call('addToMyFavorite',projectId, thisProject,currentUserId, function(err,results){
            console.log('add to my favorites');
            if(err){console.log(err);}else{console.log(results);}
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
};
Template.postPage.onCreated(function(){
    GoogleMaps.ready('map', function (map, limit) {
        var mimoaIcon = 'http://mimoa.eu/map/img/focus1.png';
        proxyDB.mimoaCollection.find({}, {limit: limit}).forEach(function (project, marker, infowindow) {
            // Add a marker to the map once it's ready

            marker = new google.maps.Marker({
                position: new google.maps.LatLng(project.lat, project.lon),
                icon: mimoaIcon,
                map: map.instance
            });

            projectDescription = "<div><p>" + project.title + "</p><br><p>" + project.summary + "</p><br><a href=" + '/posts/' + project.id + ">this project</a></div>";

            infowindow = new google.maps.InfoWindow({
                content: projectDescription
            });

            google.maps.event.addListener(marker, 'click', function () {
                if (infowindow.getMap() != null) {
                    infowindow.close();
                }
                infowindow.open(map.instance, marker);
            });

        });

        //this needs to change to current location
        myLocationMarker = new google.maps.Marker({
            position: new google.maps.LatLng(52.3478951,4.8499109),
            icon: mimoaIcon,
            map: map.instance
        });
    });
});