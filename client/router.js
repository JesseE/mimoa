var myCurrentCity;
var myCurrentCountry;
var apiKey;
var crd;
//Meteor.subscribe('mimoaCommentsCollection');
//window.onscroll = function(ev) {
//    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
//        Meteor.setTimeout(function() {
//            return subHandle.loadNextPage();
//        },1000);
//    }
//};
Router.configure({
    layoutTemplate: 'index',
    loadingTemplate: 'loading',
    waitOn: function() {
        if(Session.get('myCurrentCountry') != undefined) {
            subHandle = Meteor.subscribeWithPagination('mimoacollection', Session.get('myCurrentCountry'), Session.get('myCurrentCity'), 15);
            //     } else{
            //         subHandle = Meteor.subscribeWithPagination('mimoacollection', 'Netherlands', 'Amsterdam', 15);
            ////   }
        }
    }
});
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
    var options = {enableHighAccuracy: true};
    function success(position) {
            console.log(position);
            apiKey = 'AIzaSyCHm1lpUrl8t-6qHQ-16X39ZTNt1ocHmkM';
            crd = position.coords;
            currentLat = crd.latitude;
            currentLng = crd.longitude;
            console.log('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + currentLat + ',' + currentLng + '&key=' + apiKey + '');
        HTTP.call('GET', 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + currentLat + ',' + currentLng + '&key=' + apiKey + '', function (err, res) {
            myCurrentCity = res.data.results[0].address_components[3].long_name;
            myCurrentCountry = res.data.results[0].address_components[6].long_name;
            console.log(myCurrentCity,myCurrentCountry);
            Session.set('myCurrentCity',myCurrentCity);
            Session.set('myCurrentCountry',myCurrentCountry);
        });
    }
    function error(err) {
        console.warn('ERROR(' + err.code + '): ' + err.message);
        //myCurrentCity = 'Amsterdam';
        //myCurrentCountry = 'Netherlands';
        //subHandle = Meteor.subscribeWithPagination('mimoacollection', myCurrentCountry, myCurrentCity, 15);
        //return subHandle;
    }
    if(navigator.geolocation){
        console.log('geo detected');
        return navigator.geolocation.getCurrentPosition(success, error, options);
    }
    function onDeviceReady() {
        return navigator.geolocation.getCurrentPosition(success, error);
    }
    $(function(){
        document.addEventListener("deviceready", onDeviceReady, true);
    });
});