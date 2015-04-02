/**
 * Created by jesse on 04/03/15.
 */
proxyDB = {};
Meteor.startup(function() {

    var _opts = {
        collections: [
            { db: "mimoaDatabase", name: "mimoaCollection" }
        ]
        , bindables: ['find', 'findOne', 'insert', 'update', 'upsert',
            'remove', '_ensureIndex', '_dropIndex', '_createCappedCollection',
            'dropCollection'] //specify all the operators you want to bind
    };

    //when this runs on the server, you must provide the MONGO_URL to the proxy database
    //as well as an (optional) oplog mongo url
    if (Meteor.isServer) {
        _.extend(_opts, {
            mongoUrl: 'mongodb://JesseEikema:Eikema23@ds062797.mongolab.com:62797/mimoatest'
            //, oplogUrl: 'mongodb://meteor.mimoa.com/local'
        });
    }

    proxyDB = new MeteorDBProxy(_opts);
});
