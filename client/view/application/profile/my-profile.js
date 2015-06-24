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
});