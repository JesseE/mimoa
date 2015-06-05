var myCurrentCity;
var myCurrentCountry;
var apiKey;
var crd;
var currentCoords;
var subHandle;
var currentLat;
var currentLng;
var initializing;
var paginationNumber = 25;
myFavorites = new Mongo.Collection('myfavorites');
AccountSystem = new Mongo.Collection('mimoausers');
var currentUserId = Meteor.userId();
//Meteor.subscribe('mimoaCommentsCollection');
Router.configure({
    loadingTemplate: 'loading',
    layoutTemplate:'index',
    waitOn: function() {
        if(Router.current().route.getName() == 'myFavorites'){
            return Meteor.subscribe('mimoausersfavoritescollection', Meteor.userId());
        }
        Meteor.subscribe('mimoausersfavoritescollection', currentUserId);
        console.log(paginationNumber);
        hereBrowser = Geolocation.currentLocation();
        currentLat = hereBrowser.coords.latitude;
        currentLng = hereBrowser.coords.longitude;
        subHandle = Meteor.subscribeWithPagination('mimoacollection', currentLat, currentLng, paginationNumber);
    }
});
Template.postsList.events({
    'click button.loadbutton':function(){
        paginationNumber+=25;
        console.log(paginationNumber);
        return subHandle.loadNextPage();
    }
});
Router.map(function(){
    this.route('introduction', {
        path:'/',
        template:'intro',
        data: function () {
            if (! Meteor.user()) {
                if (Meteor.loggingIn()) {
                    var currentUserId = Meteor.userId();
                     Meteor.call('signUp',currentUserId, function(err,results){
                         console.log('add to user to remote db');
                         if(err){console.log(err);}else{console.log(results);}
                     });
                     Router.go('postsList');
                }
                else
                    Router.go('introduction');
            }
        }
    });
    this.route('postsList', {
        path:'/nearby',
        template: 'layout',
        waitOn: function() {

        },
        data: function(){
            Meteor.subscribe('mimoauserscollection');
            proxyDB.mimoaUsersCollection.find();
            return proxyDB.mimoaCollection.find({},{thumb:1,lon:1,lat:1,freetext2:1,freeint1:1,title:1});
        }
    });
    this.route('curatorsList', {
        path:'/curators',
        template:'curatorsList',
        data:function(){
            return proxyDB.mimoaCuratorsCollection.find({});
        }
    });
    this.route('curatorProfile', {
        path: '/curator/:user',
        template:'curatorsProfile',
        data:function() {

        }
    });
    this.route('myFavorites', {
        path:'/favorites',
        template:'myFavorites',
        data:function(){
            //something with the matcher still doesnt work

            proxyDB.mimoaCollection.find({},{thumb:1,lon:1,lat:1,freetext2:1,freeint1:1,title:1});
            return proxyDB.mimoaUsersFavoritesCollection.find({userID: Meteor.userId()});
        }
    });
    this.route('myFavoritesItem', {
        path:'/favorites/posts/:id',
        template:'myFavoritesItemPage',
        data:function(){
            //something with the matcher still doesnt work
            //proxyDB.mimoaCollection.find({},{thumb:1,lon:1,lat:1,freetext2:1,freeint1:1,title:1});
            return proxyDB.mimoaUsersFavoritesCollection.findOne({id:this.params.id});
        }
    });
    this.route('projectsMap', {
        path:'/map',
        template: 'projectsMap',
        data: function(){
            return proxyDB.mimoaCollection.find({},{lat:1,lon:1,summary:1,title:1,id:1,thumb:1});
        }
    });
    this.route('postPage', {
        path: '/posts/:id',
        template:'postPage',
        data: function() {
            return proxyDB.mimoaCollection.findOne({id:this.params.id}, {
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
        template: 'postPageMap',
        data: function () {
            return proxyDB.mimoaCollection.findOne({id: this.params.id},{lon:1,lat:1,title:1,summary:1,thumb:1});
        }
    });
});
Router.onBeforeAction(function() {
    GoogleMaps.load({v:'3', key:'AIzaSyCHm1lpUrl8t-6qHQ-16X39ZTNt1ocHmkM', libraries: 'geometry'});
    this.next();
}, { only: ['postPageMap','projectsMap', 'postsList'] });

