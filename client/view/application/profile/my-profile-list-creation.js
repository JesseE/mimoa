/**
 * Created by jesseeikema on 8/18/15.
 */
Template.profileListCreation.helpers({

});
Template.profileListCreation.events({
    'submit form':function(event){
        event.preventDefault();
        var currentUserId = Meteor.userId();
        var listName = event.target.listNameInput.value;
        Meteor.call('createFavList',listName,currentUserId,function(err,res){
            if(err){throw err;} else{
                return Router.go('/profile/'+currentUserId);
            }
        });
    }
});