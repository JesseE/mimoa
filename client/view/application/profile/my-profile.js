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
        return Meteor.user().emails[0].address;
    },
    offline:function(){
        //GroundDB(foo.find({userID:Meteor.userId()}));
        console.log(foo.find({}).fetch());
     //   return proxyDB.mimoaUsersFavoritesCollection.find({userID:currentUserId});
        return foo.find({});
    }
});
Template.myProfile.events({
    'click div.minus-icon': function(){
        var thisPost = this;
        return Meteor.call('removeOfflineProject', thisPost, function(err,results){
            console.log('remove projects from my favorites');
            if(err){console.log(err);}else{console.log(results);}
        });
    }
});