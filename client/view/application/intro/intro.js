/**
 * Created by jesseeikema on 5/21/15.
 */

Template.intro.events({
    'click a#login-sign-in-link': function(){
        this.addClass('login__remove-link');
    },
    'click .login-button-form-submit': function(e) {
        //e.preventDefault();
        //
        //var user = {
        //    email: $(e.target).find('[id=login-email]').val(),
        //    password: $(e.target).find('[id=login-password]').val()
        //};
        ////
        //Meteor.call('signUp', user, function(error, id) {
        //    if (error) {
        //        // display the error to the user
        //        console.log(error);
        //    } else {
        //        Router.go('nearby');
        //    }
        //});
    }
});