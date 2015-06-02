/**
 * Created by jesseeikema on 5/28/15.
 */
$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        $('.loadbutton').show();
    } else {
        $('.loadbutton').hide();
    }
});
Template.navFooter.helpers({
    userID: function(){
        return Meteor.user().emails[0].address;
    },
    introduction:function(){
        var hereInApp = Router.current().route.getName();
        if(hereInApp == 'introduction'){
            return true;
        } else {
            return false;
        }
    }
});