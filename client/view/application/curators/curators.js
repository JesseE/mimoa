Template.curatorsList.helpers({
    curators: function() {
       return proxyDB.mimoaUsersCollection.find({});
    },
    emailaddres: function() {
        return Meteor.user().username;
    }
});
Template.curatorsList.events({
    'click .curator__follow-button': function() {
        var thisCurator;
        var currentUserId;
        thisCurator = this;
        currentUserId = Meteor.userId();
        console.log(currentUserId,thisCurator);
        Meteor.call('addCuratorToMyFavorite', currentUserId,thisCurator, function(err,results){
            if(err){console.log(err);}else{console.log(results);}
        });
    }
});