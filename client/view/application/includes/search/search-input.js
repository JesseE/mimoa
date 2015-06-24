/**
 * Created by jesseeikema on 6/19/15.
 */
Template.searchInput.helpers({

});
var currentPostID;
Template.searchInput.events({
    'submit .search-form':function(e){
        e.preventDefault();
        console.log($('.search-input').val());
        currentPostID = $('.search-input').val();
        Meteor.call('searchProjectByArchitect', currentPostID, function(err,results){
            if(err){console.log(err);}else{console.log(results);}
        });
        Meteor.call('searchProjectById', currentPostID, function(err,results){
           if(err){console.log(err);}else{console.log(results);}
        });
        Meteor.call('searchProject', currentPostID, function(err,results){
            if(err){console.log(err);}else{console.log(results);}
        });
        Router.go('/search/post/'+currentPostID);
    }
});
