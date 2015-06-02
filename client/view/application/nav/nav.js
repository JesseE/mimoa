Template.nav.helpers({
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
}
});
Template.nav.events({
    'click .back-button': function(e) {
        e.preventDefault();
        window.history.back();
    }
});