///**
// * Created by jesseeikema on 5/28/15.
// */
//$(window).scroll(function() {
//    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
//        $('.loadbutton').show();
//    } else {
//        $('.loadbutton').hide();
//    }
//});
Template.navFooter.helpers({
    introduction:function(){
        var hereInApp = Router.current().route.getName();
        if(hereInApp == 'introduction'){
            return true;
        } else {
            return false;
        }
    },
    userID: function(){
        return Meteor.userId();
    }
});
Template.navFooter.events({
    //'click .fa-sign-out':function(){
    //    Meteor.logout(function(){
    //        Router.go('introduction');
    //    });
    //},
    'click .fa-search': function() {
        $('.search').show();
    },
    'click .fa-times': function(){
        $('.search').hide();
        $('.account').removeClass('drop-left');
        //$('#main').removeClass('drop-down__margin');
        //$('.post-list--curators').removeClass('drop-down');
        //$('.profile').removeClass('drop-down__margin-profile');
    },
    'click .small-layout':function() {
        $('.post').addClass('post-small');
    },
    'click .normal-layout':function() {
        $('.post').removeClass('post-small');
    }
});