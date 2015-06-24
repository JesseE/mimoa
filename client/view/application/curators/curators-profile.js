Template.curatorsProfile.helpers({
    projects: function(){
        return proxyDB.mimoaUsersFavoritesCollection.find({});
    }
});