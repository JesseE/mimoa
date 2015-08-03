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
    'click .fa-th-list':function(){
        $('.account').removeClass('fadeInUp');
        $('.account').addClass('animated fadeOutDown');
        $('.account').hide();
    },
    'click .fa-user':function(){
        $('.account').removeClass('fadeInUp');
        $('.account').addClass('animated fadeOutDown');
        $('.account').hide();
    },
    'click .fa-search': function() {
        $('.search').show();
        $('.account--search').show();
        $('.account').hide();
    },
    'click .account-info':function(){
        $('.nav').show();
    },
    'click .fa-compass':function(){
        $('.account').hide();
    },
    'click.fa-group':function(){
        $('.account').hide();
    },
    'click .fa-times': function(){
        $('.nav').show();
        $('.search').hide();
        $('.account').removeClass('fadeInUp');
        $('.account').addClass('animated fadeOutDown');
        $('.account').hide();
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