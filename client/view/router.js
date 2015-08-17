var apiKey;
var crd;
var currentCoords;
var subHandle;
var currentLat;
var currentLng;
var paginationNumber = 15;
var currentUserId = Meteor.userId();
var subs = new SubsManager();

foo = new Meteor.Collection('myfavoritesoffline');
foolist = new Meteor.Collection('myfavoritesofflinelist');
Ground.Collection(Meteor.users);
GroundDB(foo);
GroundDB(foolist);
Ground.methodResume([
    'createFavList',
    'signUp',
    'removeFavoriteProject',
    'removeCuratorFromMyFavorite',
    'addToMyFavorite',
    'addCuratorToMyFavorite',
    'comments',
    'removeComment',
    'removeOfflineProject',
    'removeProject',
    'addNewProject',
    'searchProjectById',
    'searchProjectByArchitect',
    'searchProjectByCity',
    'searchProjectByCountry',
    'searchProject',
    'updateRating',
    'saveDB',
    'offlineAvailable'
]);

Router.configure({
    loadingTemplate: 'loading',
    layoutTemplate:'index',
    waitOn: function() {
        var hereInApp = Router.current().route.getName();
        if(hereInApp == 'introduction'){
            if (Meteor.loggingIn()) {
                //return Router.go('postsList');
            } else if(Meteor.user()){
                var currentUserId = Meteor.userId();
                var user = Meteor.user();
                console.log( currentUserId, user);
                Meteor.call('signUp', currentUserId, user, function (err, results) {
                    if (err) {
                            console.log(err);
                    } else {
                        console.log('add to user to remote db' + results);

                    }
                    //hereBrowser = Geolocation.currentLocation();
                    //currentLat = hereBrowser.coords.latitude;
                    //currentLng = hereBrowser.coords.longitude;
                    //subHandle = Meteor.subscribeWithPagination('mimoacollection', hereBrowser.coords.latitude, hereBrowser.coords.longitude, paginationNumber);
                    return Router.go('postsList');
                });
            }
            else if(!Meteor.user()){
            }
        } else {
            hereBrowser = Geolocation.currentLocation();
            currentLat = hereBrowser.coords.latitude;
            currentLng = hereBrowser.coords.longitude;
            subHandle = Meteor.subscribeWithPagination('mimoacollection', hereBrowser.coords.latitude, hereBrowser.coords.longitude, paginationNumber);
        }
    }
});

Router.onBeforeAction(function () {
    if (Meteor.loggingIn()) {
        this.render('loading');
    }
    else {
        this.next();
    }
});
Router.onBeforeAction(function() {
    GoogleMaps.load({v:'3', key:'AIzaSyCHm1lpUrl8t-6qHQ-16X39ZTNt1ocHmkM', libraries: 'geometry, directions'});
    this.next();
});
IronRouterAutoscroll.animationDuration = 100;
//this should be refactored
Template.postsList.events({
    'click button.loadbutton':function(){
        paginationNumber+=25;
        console.log(paginationNumber);
        subHandle.loadNextPage();
    }
});

Router.map(function(){
    this.route('introduction', {
        path:'/',
        template:'intro',
        onBeforeAction:function(){
            this.render('loading');
            this.next();
        },
        data: function () {

        },
        cache:true,
        fastRender: true
    });
    this.route('searchProject', {
        path:'/#!search/post/:currentPostID',
        template:'searchResult',
        waitOn:function(){
            var currentPostID = this.params.currentPostID;
            return Meteor.subscribe('mimoacollectionspecific', currentPostID);
        },
        data: function(){
            var currentPostID = this.params.currentPostID;
            //return proxyDB.mimoaCollection.find({$and:[{'title':{$regex:currentPostID, $options: "i"}},{'city':{$regex:currentPostID, $options: "i"}}]});
            console.log(currentPostID);
            return proxyDB.mimoaCollection.find({'title':{$regex:currentPostID, $options: "i"}});
        }
    });
    this.route('postsList', {
        path:'/nearby',
        template: 'layout',
        onBeforeAction:function(){
            this.render('loading');
            this.next();
        },
        waitOn:function(){
            var currentUserId = Meteor.userId();
            Meteor.subscribe('myfavoritesofflinelist',currentUserId);
            subHandle = Meteor.subscribeWithPagination('mimoacollection', currentLat, currentLng, paginationNumber);
        },
        //onAfterAction:function(){
        //    this.render('loading');
        //},
        data: function(){
            var currentUserId = Meteor.userId();
            foolist.find({userID:currentUserId});
            return proxyDB.mimoaCollection.find({},{image1:1,lon:1,lat:1,freetext2:1,freeint1:1,title:1, coordinates:1,imageset:1});
        },
        cache:true,
        fastRender: true
    });
    this.route('curatorsList', {
        path:'/curators',
        template:'curatorsList',
        waitOn:function(){
            Meteor.subscribe('mimoauserscollectionlist');
        },
        data:function(){
            return proxyDB.mimoaUsersCollection.find({"userID":{$ne: null}});
        },
        fastRender: true
    });
    this.route('myProfile', {
        path:'/profile/:userID',
        template:'myProfile',
        waitOn:function(){
// to fix this shizzle

            var currentUserId = this.params.userID;
            Meteor.subscribe('myfavoritesofflinelist',currentUserId);
            Meteor.subscribe('myfavoritesofflinelisting', currentUserId);
            //subs.subscribe('myfavoritesofflinelisting', currentUserId, listName);
            Meteor.subscribe('myfavoritesofflinelistitems',currentUserId);
            Meteor.subscribe('myfavoritesoffline',currentUserId,currentLng,currentLat);
            //Meteor.subscribe('myfavoritesofflinelisting', currentUserId, listName);
            //subs.subscribe('myfavoritesofflinelisting', currentUserId, listName);
           // Meteor.subscribe('myfavoritesofflinelistitems',currentUserId);
           // Meteor.subscribe('myfavoritesoffline',currentUserId,currentLng,currentLat);
           // subs.subscribe('myfavoritesoffline',currentUserId,currentLng,currentLat);
           ////Meteor.subscribe('mimoauserscollectionlist');
           // Meteor.subscribe('mimoacuratorscollection', this.params.userID);
           // Meteor.subscribe('mimoausersfavoritescollection', this.params.userID);
        },
        data: function(){
           // proxyDB.mimoaUsersFavoritesCollection.find({userID:this.params.userID});
           // foolist.find({userID:this.params.userID});
           // return foo.find({'userID':this.params.userID});
            return foolist.find({userID:Meteor.userId()});
        },
        cache:true,
        fastRender: true
    });
    this.route('myProfileListItem', {
        path:'/profile/:userID/:listName',
        template:'myProfilePage',
        waitOn:function(){
// to fix this shizzle
            var currentUserId = this.params.userID;
            var listName = this.params.listName;
            Meteor.subscribe('myfavoritesofflinelist',currentUserId);
            Meteor.subscribe('myfavoritesofflinelisting', currentUserId, listName);
            //subs.subscribe('myfavoritesofflinelisting', currentUserId, listName);
            Meteor.subscribe('myfavoritesofflinelistitems',currentUserId);
            Meteor.subscribe('myfavoritesoffline',currentUserId,currentLng,currentLat);
            //subs.subscribe('myfavoritesoffline',currentUserId,currentLng,currentLat);
            ////Meteor.subscribe('mimoauserscollectionlist');
            ////Meteor.subscribe('mimoacuratorscollection', this.params.userID);
            //// Meteor.subscribe('mimoausersfavoritescollection', this.params.userID);
        },
        data: function(){
            // proxyDB.mimoaUsersFavoritesCollection.find({userID:this.params.userID});
            var listNameParams = this.params.listName;
            //foolist.find({userID:this.params.userID,name:this.params.listNameParams});
            return foo.find({'userID':this.params.userID,name:listNameParams});
        },
        cache:true,
        fastRender: true
    });
    this.route('curatorProfile', {
        path: '/curator/:userID',
        template:'curatorsProfile',
        waitOn:function(){
            Meteor.subscribe('mimoausersfavoritescollection',this.params.userID);
        },
        data:function() {
            return proxyDB.mimoaUsersFavoritesCollection.find({userID:this.params.userID});
        },
        fastRender: true
    });
    this.route('favoriteCuratorProfile', {
        path: '/curator/:curators.userID',
        template:'curatorsProfile',
        waitOn:function(){
            Meteor.subscribe('mimoausersfavoritescollection',this.params.userID);
        },
        data:function() {
            //proxyDB.mimoaUsersCollection.find({"userID":{$ne: null}});
            return proxyDB.mimoaUsersFavoritesCollection.find({userID:this.params.userID});
        },
        fastRender: true
    });
    this.route('myCuratorItem', {
        path:'/curator/:userID/posts/:id',
        template:'myFavoritesItemPage',
        waitOn: function() {
            Meteor.subscribe('mimoauserscollectionlist');
            Meteor.subscribe('mimoausersfavoritescollection', this.params.userID);
            Meteor.subscribe('mimoacuratorscollection', this.params.userID);
        },
        data:function(){
            return proxyDB.mimoaUsersFavoritesCollection.findOne({'userID': this.params.userID, 'project.id':this.params.id});
        },
        fastRender: true
    });
    this.route('myFavorites', {
        path:'/favorites',
        template:'myFavorites',
        waitOn:function(){
            Meteor.subscribe('mimoauserscollectionlist');
            Meteor.subscribe('mimoausersfavoritescollection', currentUserId);
            Meteor.subscribe('mimoacuratorscollection', currentUserId);
        },
        data:function(){
            proxyDB.mimoaCuratorsCollection.find({userID: Meteor.userId()});
            return proxyDB.mimoaUsersFavoritesCollection.find({userID: Meteor.userId()});
        },
        fastRender: true
    });
    this.route('myOfflineFavoritesItem', {
        path:'offline/favorites/:userID/posts/:id',
        template:'myOfflineFavoritesItemPage',
        waitOn: function() {
            var currentPostID = this.params.id;
            var currentUserId = this.params.userID;
            Meteor.subscribe('myfavoritesofflinelistitems',currentUserId);
            Meteor.subscribe('myfavoritesoffline',currentUserId,currentLng,currentLat);
            subs.subscribe('myfavoritesofflinespecific',currentPostID);
            Meteor.subscribe('myfavoritesofflinespecific',currentPostID);
        },
        data:function(){
            var currentPostID = this.params.id;
            return foo.findOne({'project.id':currentPostID},{
                id:1,title:1,address:1,website:1,freeint1:1,freetext2:1,freetext3:1,freetext8:1,freetext9:1,lon:1,lat:1,thumb:1,image1:1,imageset:1,imagedescription:1,summary:1
            });
        },
        cache:true,
        fastRender: true
    });
    this.route('myFavoritesItem', {
        path:'/favorites/:userID/posts/:id',
        template:'myFavoritesItemPage',
        waitOn: function() {
            Meteor.subscribe('mimoausersfavoritescollection',this.params.userID);
            Meteor.subscribe('myfavoritesoffline');
        },
        data:function(){
            foo.find({});
            return proxyDB.mimoaUsersFavoritesCollection.findOne({'userID': this.params.userID, 'project.id':this.params.id});
        },
        fastRender: true
    });
    this.route('projectsMap', {
        path:'/map',
        template: 'projectsMap',
        onBeforeAction: function () {
            this.render('loading');
            this.next();
        },
        waitOn: function() {
            hereBrowser = Geolocation.currentLocation();
            currentLat = hereBrowser.coords.latitude;
            currentLng = hereBrowser.coords.longitude;
            subHandle = Meteor.subscribeWithPagination('mimoacollection', currentLat, currentLng, paginationNumber);
        },
        data: function(){
            return proxyDB.mimoaCollection.find({},{lat:1,lon:1,summary:1,title:1,id:1,thumb:1});
        },
        cache:true,
        fastRender: true
    });
    this.route('postPage', {
        path: '/posts/:id',
        template:'postPage',
        waitOn: function(){
            var currentPostID = this.params.id;
            var limit = 1;
            Meteor.subscribe('myfavoritesofflinelist',currentUserId);
            subs.subscribe('mimoacollectionspecific', currentPostID, limit);
            Meteor.subscribe('mimoacollectionspecific', currentPostID, limit);
        },
        data: function() {
            foolist.find({userID:currentUserId});
            return proxyDB.mimoaCollection.findOne({id:this.params.id}, {
                id:1,title:1,address:1,website:1,freeint1:1,freetext2:1,freetext3:1,freetext8:1,freetext9:1,lon:1,lat:1,thumb:1,image1:1,imageset:1,imagedescription:1,summary:1
            });
        },
        cache:true,
        fastRender: true
    });
    this.route('postPageSearched', {
        path: '/search/post/page/:id',
        template:'postPage',
        waitOn: function(){
            var currentPostID = this.params.id;
            Meteor.subscribe('mimoacollectionspecificsearch', currentPostID);
        },
        data: function() {
            return proxyDB.mimoaCollection.findOne({id:this.params.id}, {
                id:1,title:1,address:1,website:1,freeint1:1,freetext2:1,freetext3:1,freetext8:1,freetext9:1,lon:1,lat:1,thumb:1,image1:1,imageset:1,imagedescription:1,summary:1
            });
        },
        fastRender: true
    });
    this.route('curatorPostPage', {
        path: '/posts/:projects.id',
        template:'postPage',
        waitOn: function(){
            subs.subscribe('mimoauserscollection');
            Meteor.subscribe('mimoauserscollection');
        },
        data: function() {
            return proxyDB.mimoaCollection.findOne({id:this.params.id}, {
                id:1,title:1,address:1,website:1,freeint1:1,freetext2:1,freetext3:1,freetext8:1,freetext9:1,lon:1,lat:1,thumb:1,image1:1,imageset:1,imagedescription:1,summary:1
            });
        },
        cache:true,
        fastRender: true
    });
    this.route('postPageCarousel', {
        path:'/posts/carousel/:id',
        layoutTemplate:'postPageCarousel',
        data: function() {
            return proxyDB.mimoaCollection.findOne({id: this.params.id},{imageset:1,imagedescription:1});
        },
        fastRender: true
    });
    this.route('addNewProject', {
        path: '/newpost',
        template: 'addNewProject',
        data: function() {}
    });
    this.route('postPageMap', {
        path: '/posts/map/:id',
        template: 'postPageMap',
        waitOn: function() {
           return  Meteor.subscribe('mimoacollection');
        },
        data: function () {
            return proxyDB.mimoaCollection.findOne({id: this.params.id},{lon:1,lat:1,title:1,summary:1,thumb:1});
        },
        cache:true,
        fastRender: true
    });
    this.route('calculatedRoute',{
        path:'profile/collection/:currentUser/:listName/map',
        template:'collectionRoute',
        waitOn: function(){
            subs.subscribe('mimoauserscollectionlist');
            var currentUserId = this.params.currentUser;
            var listName = this.params.listName;
            Meteor.subscribe('myfavoritesoffline',currentUserId,currentLng,currentLat);
            subs.subscribe('myfavoritesoffline',currentUserId,currentLng,currentLat);
            Meteor.subscribe('myfavoritesofflinelisting', currentUserId, listName);
            subs.subscribe('myfavoritesofflinelisting', currentUserId, listName);
            //Meteor.subscribe('myfavoritesofflinelistitems',currentUserId);
            Meteor.subscribe('myfavoritesoffline',currentUserId,currentLng,currentLat);
            //subs.subscribe('mimoacuratorscollection', this.params.currentUser);
            //subs.subscribe('mimoausersfavoritescollection', this.params.currentUser);
            //Meteor.subscribe('mimoauserscollectionlist');
            //Meteor.subscribe('mimoacuratorscollection', this.params.currentUser);
            //Meteor.subscribe('mimoausersfavoritescollection', this.params.currentUser);
            return GoogleMaps.load({v:'3', key:'AIzaSyCHm1lpUrl8t-6qHQ-16X39ZTNt1ocHmkM', libraries: 'geometry, directions'});
        },
        data:function(){
            var listName = this.params.listName;
            return foo.find({userID:Meteor.userId(),name:listName});
        },
        cache:true,
        fastRender:true
    });
    this.route('favoritePostPageMap', {
        path:'/curator/:userID/posts/map/:id',
        template:'favoritePostPageMap',
        waitOn:function(){
            subs.subscribe('mimoausersfavoritescollection',this.params.userID);
            Meteor.subscribe('mimoausersfavoritescollection',this.params.userID);
        },
        data:function() {
            return proxyDB.mimoaUsersFavoritesCollection.findOne({'userID': this.params.userID,'project.id':this.params.id},{
                id:1,title:1,address:1,website:1,freeint1:1,freetext2:1,freetext3:1,freetext8:1,freetext9:1,lon:1,lat:1,thumb:1,image1:1,imageset:1,imagedescription:1,summary:1});
        },
        cache:true,
        fastRender: true
    });
});

if(Meteor.isServer) {
    FastRender.route('postsList', {
        path:'/nearby/',
        template: 'layout',
        waitOn:function(){
            Meteor.subscribe('mimoausercollection', Meteor.userId());
            hereBrowser = Geolocation.currentLocation();
            currentLat = hereBrowser.coords.latitude;
            currentLng = hereBrowser.coords.longitude;
            subHandle = Meteor.subscribeWithPagination('mimoacollection', currentLat, currentLng, paginationNumber);
        },
        data: function(){
            proxyDB.mimoaUsersCollection.find({userID:currentUserId});
            return proxyDB.mimoaCollection.find({});
        },
        cache:true,
        fastRender: true
    });
}