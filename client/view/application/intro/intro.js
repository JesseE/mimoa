/**
 * Created by jesseeikema on 5/21/15.
 */

Template.intro.events({
    'click a#login-sign-in-link': function(){
        //this.addClass('login__remove-link');
    },
    'click #login-buttons-password': function() {

    }//,
    //'click .login': function() {
    //    if(!Meteor.user()){
    //        if (Meteor.loggingIn()) {
    //            var currentUserId = Meteor.userId();
    //            var user = Meteor.user();
    //            console.log( currentUserId, user);
    //            Meteor.call('signUp', currentUserId, user, function (err, results) {
    //                if (err) {
    //                    console.log(err);
    //                } else {
    //                    console.log('add to user to remote db' + results);
    //                    Router.go('postsList');
    //                }
    //            });
    //        }
    //    } else if(Meteor.user()){
    //        Router.go('postsList');
    //    }
    //}

});


Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});
