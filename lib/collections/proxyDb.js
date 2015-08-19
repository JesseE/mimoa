/**
 * Created by jesse on 04/03/15.
 */
//to improve pref add oplog support
proxyDB = {};
Meteor.startup(function() {
    var _opts = {
        collections: [
            { db: "mimoaDatabase", name: "mimoaCollection" },
            { db: 'mimoaComments', name: "mimoaCommentsCollection"},
            { db: 'mimoaUsers', name:'mimoaUsersCollection'},
            { db: 'mimoaUsersFavorites', name:'mimoaUsersFavoritesCollection'},
            { db: 'mimoaCurators', name:'mimoaCuratorsCollection'},
            { db: 'mimoaMyFavorites', name:'mimoaMyFavoritesCollection'}
        ]
        , bindables: ['find', 'findOne','insert', 'update', 'upsert',
            'remove', '_ensureIndex', '_dropIndex', '_createCappedCollection',
            'dropCollection'] //specify all the operators you want to bind
    };
    if (Meteor.isServer) {
        _.extend(_opts, {
            mongoUrl: 'mongodb://JesseEikema:Eikema23@ds061651.mongolab.com:61651/mimoa'
        });
    }
    proxyDB = new MeteorDBProxy(_opts);

});