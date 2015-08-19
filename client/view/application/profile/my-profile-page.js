/**
 * Created by jesseeikema on 8/11/15.
 */
var listName;
Template.myProfilePage.helpers({
    following: function(){
        return proxyDB.mimoaCuratorsCollection.find().count();
    },
    favorites:function(){
        return proxyDB.mimoaUsersFavoritesCollection.find().count();
    },
    userID: function(){
        return Meteor.userId();
    },
    name:function(){
        return titleList;
    },
    offline:function(){
        listName = Router.current().params.listName;
        console.log(listName);
        return foo.find({name:listName},{sort: { 'project.title' : 1 }});
    },
    currentDistance: function() {
        var hereBrowser = Geolocation.currentLocation();
        currentLocation = new google.maps.LatLng(hereBrowser.coords.latitude, hereBrowser.coords.longitude);
        objectLocation = new google.maps.LatLng(this.project.lat[0],this.project.lon[0]);
        distanceToLocation = /*JSON.parse(*/(google.maps.geometry.spherical.computeDistanceBetween(currentLocation, objectLocation)).toFixed(0)/*)*/;
        return distanceToLocation;
    },
    list:function(){
        return foolist.find({userID:Meteor.userId()});
    }
});
Template.myProfilePage.events({
    'click .post--list':function(event){
        var text = $(event.target).text().replace(/\s+/g, '');
        listName = text;
        $('.post--list').removeClass('fadeInLeft');
        $('.post--list').addClass('fadeOutLeft');
        var userID = Meteor.userId();
        $('post--list-items').addClass('animated fadeInRight');
        return Router.go('/profile/'+userID+'/'+listName);
    },
    'click .new-list .back-button':function(){
        $('.new-list').removeClass('fadeInRight');
        $('.new-list').addClass('fadeOutLeft');
        $('.post-container').removeClass('fadeOutLeft');
        $('.post-container').addClass('fadeInRight');
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
    },
    'click .minus-icon': function(){
        var thisPost = this;
        Meteor.call('removeProject', thisPost, function(err,results){
            console.log('remove projects from my favorites');
            if(err){console.log(err);}else{console.log(results);}
        });
        return Meteor.call('removeOfflineProject', thisPost, function(err,results){
            console.log('remove projects from my favorites');
            if(err){console.log(err);}else{console.log(results);}
        });
    },
    'click .offline-button': function(){
        return proxyDB.mimoaUsersFavoritesCollection.find({userID:Meteor.userId()}).forEach(function (project) {
            return Meteor.call('offlineAvailable', project, function(err, res){
                if(err){throw err;} else{ console.log(res);}
            });
        });
    },
    'click .post-favorites__listing-calculate':function(){
        var currentUser = Meteor.userId();
        return Router.go('calculatedRoute',{currentUser:Meteor.userId(),listName:listName});
    }
});
