/**
 * Created by jesse on 04/03/15.
 */
proxyDB = {};
Meteor.startup(function() {

    var _opts = {
        collections: [
            { db: "mimoaDatabase", name: "mimoaCollection" },
            { db: 'mimoaComments', name: "mimoaCommentsCollection"}
        ]
        , bindables: ['find', 'findOne', 'insert', 'update', 'upsert',
            'remove', '_ensureIndex', '_dropIndex', '_createCappedCollection',
            'dropCollection'] //specify all the operators you want to bind
    };
    if (Meteor.isServer) {
        _.extend(_opts, {
            mongoUrl: 'mongodb://JesseEikema:Eikema23@ds062797.mongolab.com:62797/mimoatest'
            //, oplogUrl: 'mongodb://meteor.local'
        });
    }

    proxyDB = new MeteorDBProxy(_opts);
});
