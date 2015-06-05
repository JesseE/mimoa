Template.curatorsList.helpers({
   currators: function() {
       return proxyDB.mimoaCollection.find({});
   }
});
Template.curatorsList.events({
    'click .curator__follow-button': function() {

    }
});