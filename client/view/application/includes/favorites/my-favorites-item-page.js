///**
// * Created by jesseeikema on 6/5/15.
// */
Template.myFavoritesItemPage.helpers({
    favorites: function() {
        var currentPostID = JSON.stringify(Router.current().params.id);
        console.log(currentPostID);
        return proxyDB.mimoaUsersFavoritesCollection.findOne({'project.id':currentPostID});
    }
});