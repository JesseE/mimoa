
Meteor.subscribe('mimoaCommentsCollection');
//Meteor.subscribeWithPagination('mimoacollection',40);
Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
        waitOn: function() { return [ Meteor.subscribeWithPagination('mimoacollection',10)];
   }
});

Router.map(function(){
    this.route('postsList', {
        path:'/',
        template: 'postsList',
        data: function(limit){
            return proxyDB.mimoaCollection.find({},{limit:limit});
        }
    });
    this.route('projectsMap', {
        path:'/map',
        template: 'projectsMap',
        data: function(limit){
            here = Geolocation.currentLocation();
            return proxyDB.mimoaCollection.find({},{limit:limit});
        }
    });
    this.route('postPage', {
        path: '/posts/:id',
        data: function(limit) {
            return proxyDB.mimoaCollection.findOne({id: this.params.id},{limit:limit});
        }
    });
    this.route('postPageCarousel', {
        path:'/posts/carousel/:id',
        layoutTemplate:'postPageCarousel',
        data: function(limit) {
            return proxyDB.mimoaCollection.findOne({id: this.params.id},{limit:limit});
        }
    });
    this.route('addNewProject', {
        path: '/newpost',
        template: 'addNewProject',
        data: function() {}
    });
    this.route('postPageMap', {
        path: '/posts/map/:id',
        layoutTemplate: 'postPageMap',
        data: function (limit) {
            return proxyDB.mimoaCollection.findOne({id: this.params.id},{limit:limit});
        }
    });
});
//var requireLogin = function () {
//    if (!Meteor.user()) {
//        if (Meteor.loggingIn()) {
//            this.render(this.loadingTemplate);
//        } else {
//            this.render('accessDenied');
//        }
//    } else {
//        this.next();
//    }
//};
//Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
Router.onBeforeAction(function() {
    GoogleMaps.load({v:'3', key:'AIzaSyCHm1lpUrl8t-6qHQ-16X39ZTNt1ocHmkM', libraries: ['geometry','directions']});
    this.next();
}, { only: ['postsList','projectsMap','postPageMap', 'addNewProject'] });
