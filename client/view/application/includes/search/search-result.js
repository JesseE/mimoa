/**
 * Created by jesseeikema on 6/22/15.
 */
Template.searchResult.helpers({
    post: function() {

    }
});
Template.searchResult.events({
    'click div.favorite-icon':function(){
        var projectId = this._id;
        var thisProject = this;
        var currentUserId = Meteor.userId();
        console.log(projectId,thisProject,currentUserId);
        return Meteor.call('addToMyFavorite',projectId, thisProject, currentUserId, function(err,results){
            console.log('add to my favorites');
            if(err){console.log(err);}else{console.log(results);}
        });
    }
});