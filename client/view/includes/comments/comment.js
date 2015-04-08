/**
 * Created by jesse on 20/02/15.
 */
Template.comment.helpers({
    submittedText: function() {
        var Id = this.id;
        return proxyDB.mimoaCommentsCollection.find({postId:Id});
        //return new Date(this.submitted).toString();
    }
});
Template.comment.events({
    'click .remove-button': function() {
        var postId = this;
        Meteor.call('removeComment', postId, function(err, result) {
           if(err){
               console.log(err);
           }
            if(result){
               console.log(result);
           }
        });
    }
});