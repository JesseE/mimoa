/**
 * Created by jesseeikema on 6/10/15.
 */
Template.myProfile.helpers({
    following: function(){
        return proxyDB.mimoaCuratorsCollection.find().count();
    },
    favorites:function(){
        return proxyDB.mimoaUsersFavoritesCollection.find().count();
    },
    userID: function(){
        return Meteor.userId();
    },
    offline:function(){
        return foo.find({userID:Meteor.userId()});
    }
});
Template.myProfile.events({
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
        return Router.go('calculatedRoute',{currentUser:Meteor.userId()});
    },
});