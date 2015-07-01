/**
 * Created by jesseeikema on 5/22/15.
 */
$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        $('.loadbutton').show();
    } else {
        $('.loadbutton').hide();
    }
});
Template.myFavorites.rendered = function() {
    var options = {enableHighAccuracy: false};
    function success(position) {
        console.log(position);
        apiKey = 'AIzaSyCHm1lpUrl8t-6qHQ-16X39ZTNt1ocHmkM';
        crd = position.coords;
        currentLat = crd.latitude;
        currentLng = crd.longitude;
        currentCoords = [currentLng,currentLat];
        console.log(currentLat,currentLng);
        return subHandle = Meteor.subscribeWithPagination('mimoacollection', currentLat, currentLng, 25);
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
};
Template.myFavorites.helpers({
    posts: function() {
        proxyDB.mimoaCollection.find({},{thumb:1,lon:1,lat:1,freetext2:1,freeint1:1,title:1});
        return proxyDB.mimoaUsersFavoritesCollection.find({userID:  Meteor.userId()});
    },
    curators:function(){
        proxyDB.mimoaCollection.find({},{thumb:1,lon:1,lat:1,freetext2:1,freeint1:1,title:1});
        return proxyDB.mimoaCuratorsCollection.find({userID: Meteor.userId()});
    },
    currentUser: function(){
        return Meteor.userId();
    }
});
Template.myFavorites.events({
    'click .calculate-route':function(){
        var waypoints = proxyDB.mimoaUsersFavoritesCollection.find({userID:Meteor.userId()}).fetch();
        console.log(waypoints);
    },
    'click .post-bar': function() {
        $('.post').toggle();
    },
    'click .curator-bar': function() {
        $('.curator--favorite').toggle();
        window.scrollTo(0,document.body.scrollHeight);
    },
    'click a.post-item':function(){
        var projectTitle = this.title;
    },
    'click button.loadbutton':function(){
        return subHandle.loadNextPage();
    },
    'click div.minus-icon':function(){
        var thisPost = this;
        return Meteor.call('removeFavoriteProject', thisPost, function(err,results){
            console.log('remove projects from my favorites');
            if(err){console.log(err);}else{console.log(results);}
        });
    },
    'click .curator__unfollow-button':function(){
        var thisCurator;
        thisCurator = this;
        var thisUserID;
        thisUserID = this.userID;
        console.log(thisCurator,thisUserID);
        return Meteor.call('removeCuratorFromMyFavorite', thisCurator,thisUserID , function(err, results){
            console.log('removed curator from favorites');
            if(err) {console.log(err);}else{console.log(results);}
        });
    }
});