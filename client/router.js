var myCurrentCity;
var myCurrentCountry;
var apiKey;
var crd;
var currentCoords;
var subHandle;
var currentLat;
var currentLng;
//Meteor.subscribe('mimoaCommentsCollection');
Router.configure({
    layoutTemplate: 'index',
    loadingTemplate: 'loading',
    waitOn: function() {
       return subHandle;
    }
});
Router.map(function(){
    this.route('postsList', {
        path:'/',
        template: 'layout',
        data: function(){
            return proxyDB.mimoaCollection.find({},{thumb:1,lon:1,lat:1,freetext2:1,freeint1:1,title:1});
        }
    });
    this.route('projectsMap', {
        path:'/map',
        template: 'projectsMap',
        data: function(){
           return proxyDB.mimoaCollection.find({},{lat:1,lon:1,summary:1,title:1,id:1});
        }
    });
    this.route('postPage', {
        path: '/posts/:id',
        template:'postItemPage',
        data: function() {
            return proxyDB.mimoaCollection.findOne({id: this.params.id}, {
                id:1,title:1,address:1,website:1,freeint1:1,freetext2:1,freetext3:1,freetext8:1,freetext9:1,lon:1,lat:1,thumb:1,image1:1,imageset:1,imagedescription:1,summary:1
            });
        }
    });
    this.route('postPageCarousel', {
        path:'/posts/carousel/:id',
        layoutTemplate:'postPageCarousel',
        data: function() {
            return proxyDB.mimoaCollection.findOne({id: this.params.id},{imageset:1,imagedescription:1});
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
        data: function () {
            return proxyDB.mimoaCollection.findOne({id: this.params.id},{lon:1,lat:1,title:1,summary:1});
        }
    });
});
Router.onBeforeAction(function() {
    GoogleMaps.load({v:'3', key:'AIzaSyCHm1lpUrl8t-6qHQ-16X39ZTNt1ocHmkM', libraries: 'geometry'});
    this.next();
}, { only: ['postPageMap','projectsMap', 'postsList'] });

