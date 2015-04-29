var myCurrentCity;
var myCurrentCountry;
var apiKey;
var crd;
//Meteor.subscribe('mimoaCommentsCollection');
Router.configure({
    layoutTemplate: 'index',
    loadingTemplate: 'loading'
});
//window.onscroll = function(ev) {
//    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
//        Meteor.setTimeout(function() {
//            return subHandle.loadNextPage();
//        },1000);
//    }
//};
Router.map(function(){
    this.route('postsList', {
        path:'/',
        template: 'layout',
        data: function(){
            return proxyDB.mimoaCollection.find({});
        }
    });
    this.route('projectsMap', {
        path:'/map',
        template: 'projectsMap',
        data: function(){
           return proxyDB.mimoaCollection.find({});
        }
    });
    this.route('postPage', {
        path: '/posts/:id',
        template:'postItemPage',
        data: function() {
            return proxyDB.mimoaCollection.findOne({id: this.params.id});
        }
    });
    this.route('postPageCarousel', {
        path:'/posts/carousel/:id',
        layoutTemplate:'postPageCarousel',
        data: function() {
            return proxyDB.mimoaCollection.findOne({id: this.params.id});
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
            return proxyDB.mimoaCollection.findOne({id: this.params.id});
        }
    });
});
Router.onBeforeAction(function() {
    GoogleMaps.load({v:'3', key:'AIzaSyCHm1lpUrl8t-6qHQ-16X39ZTNt1ocHmkM', libraries: 'geometry'});
    this.next();
}, { only: ['postPageMap','projectsMap', 'postsList'] });

Meteor.startup(function(){
    function success(position) {

        apiKey = 'AIzaSyCHm1lpUrl8t-6qHQ-16X39ZTNt1ocHmkM';
        crd = position.coords;
        currentLat = crd.latitude;
        currentLng = crd.longitude;

        if(currentLat != null){
            HTTP.call('GET', 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + currentLat + ',' + currentLng + '&key=' + apiKey + '', function (err, res) {
                myCurrentCity = res.data.results[0].address_components[3].long_name;
                myCurrentCountry = res.data.results[0].address_components[6].long_name;
                subHandle = Meteor.subscribeWithPagination('mimoacollection', myCurrentCountry, myCurrentCity, 15);
                return subHandle;
            });
        } else {
            myCurrentCity = 'Amsterdam';
            myCurrentCountry = 'Netherlands';
            subHandle = Meteor.subscribeWithPagination('mimoacollection', myCurrentCountry, myCurrentCity, 15);
            return subHandle;
        }
    }

    function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
        myCurrentCity = 'Amsterdam';
        myCurrentCountry = 'Netherlands';
        subHandle = Meteor.subscribeWithPagination('mimoacollection', myCurrentCountry, myCurrentCity, 15);
        return subHandle;
    }

    navigator.geolocation.getCurrentPosition(success, error);

    function onDeviceReady() {
        return navigator.geolocation.getCurrentPosition(success, error);
    }
    $(function(){
        document.addEventListener("deviceready", onDeviceReady, true);
    });
});