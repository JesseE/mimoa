var areYouOnline;
Template.nav.helpers({
    templateGestures: {
        'tap a.nearby-button': function () {
            $('.account').addClass('drop-down');
        },
        'swipe .nav':function(){
            $('.nav').show();
            $('.search').hide();
            $('.account').removeClass('fadeInUp');
            $('.account').addClass('animated fadeOutDown');
            $('.account').hide();
        }

    },
    intro:function(){
        var hereInApp = Router.current().route.getName();
        if(hereInApp == 'introduction'){
            return true;
        } else {
            return false;
        }
    },
    postPage: function(){
        var hereInApp = Router.current().route.getName();
        if(hereInApp == 'postPage'){
            return true;
        } else {
            return false;
        }
    },
    mapPage: function(){
        var hereInApp = Router.current().route.getName();
        if(hereInApp == 'projectsMap'){
            return true;
        } else {
            return false;
        }
    },
    postList: function(){
        var hereInApp = Router.current().route.getName();
        if(hereInApp == 'postsList'){
            return true;
        } else {
            return false;
        }
    },
    postPageMap:function(){
        var hereInApp = Router.current().route.getName();
        if(hereInApp == 'postPageMap'){
            return true;
        } else {
            return false;
        }
    },
    favoritesPage:function(){
        var hereInApp = Router.current().route.getName();
        if(hereInApp == 'myFavorites'){
            return true;
        } else {
            return false;
        }
    },
    profilePage:function(){
        var hereInApp = Router.current().route.getName();
        if(hereInApp == 'myProfile'){
            return true;
        } else {
            return false;
        }
    },
    curatorPage:function(){
        var hereInApp = Router.current().route.getName();
        if(hereInApp == 'curatorsList'){
            return true;
        } else {
            return false;
        }
    },
    curatorProjectsPage:function(){
        var hereInApp = Router.current().route.getName();
        if(hereInApp == 'favoriteCuratorProfile'){
            return true;
        } else {
            return false;
        }
    }
    //currentUserOffline: function(){
    //    if(Meteor.status().connected == false){
    //        alert(Meteor.status().connected);
    //
    //        //areYouOnline = false;
    //        //return areYouOnline;
    //    } else if(Meteor.status().connected == true){
    //        //areYouOnline = true;
    //        alert(Meteor.status().connected);
    //        //return areYouOnline;
    //    }
    //}
});
Template.nav.events({
    'click .nearby-button .fa-th-list': function(e){
        e.preventDefault();
        //if($('.back-button').show()){
        //    $('.nearby-button').addClass('nearby-button--mod');
        //}else if($('.back-button').hide()){
        //    $('.nearby-button').removeClass('nearby-button--mod');
        //}
        $('.account').show();
        $('.nav').hide();
        $('.account').removeClass('fadeOutDown');
        $('.account').addClass('animated fadeInUp');
        //$('#main').addClass('drop-down__margin');
        //$('.post-list--curators').addClass('drop-down');
        //$('.profile').addClass('drop-down__margin-profile');
    },
    'click .back-button': function(e) {
        e.preventDefault();
        window.history.back();
    }
});