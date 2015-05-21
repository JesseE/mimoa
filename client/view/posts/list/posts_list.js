$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        $('.loadbutton').show();
    } else {
        $('.loadbutton').hide();
    }
});
var subHandle;
var currentLat;
var currentLng;
Meteor.startup(function(){
    var options = {enableHighAccuracy: true};
    function success(position) {
        //console.log(position);
        apiKey = 'AIzaSyCHm1lpUrl8t-6qHQ-16X39ZTNt1ocHmkM';
        crd = position.coords;
        currentLat = crd.latitude;
        currentLng = crd.longitude;
        currentCoords = [currentLng,currentLat];
        //Meteor.call('getCurrentCoords',currentLat, currentLng, function(err, res) {
        //    if(err){console.log(err)}else{console.log('currrent loc send to server');}
        //    console.log(currentLat,currentLng);hero
        //});
        subHandle = Meteor.subscribeWithPagination('mimoacollection', currentLat, currentLng, 25);
        //console.log('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + currentLat + ',' + currentLng + '&key=' + apiKey + '');
        HTTP.call('GET', 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + currentLat + ',' + currentLng + '&key=' + apiKey + '', function (err, res) {
            myCurrentCity = res.data.results[0].address_components[3].long_name;
            myCurrentCountry = res.data.results[0].address_components[6].long_name;
            //console.log(myCurrentCity,myCurrentCountry);
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
        return navigator.geolocation.getCurrentPosition(success, error, options);
    }
    function onDeviceReady() {
        return navigator.geolocation.getCurrentPosition(success, error);
    }
    $(function(){
        document.addEventListener("deviceready", onDeviceReady, true);
    });
});
//window.onscroll = function(ev) {
//    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
//        Meteor.setTimeout(function() {
//            return subHandle.loadNextPage();
//        },1000);
//    }
//};
Template.postsList.helpers({
    posts: function() {
        var here = Geolocation.latLng();
        console.log(here.lat, here.lng);
        subHandle = Meteor.subscribeWithPagination('mimoacollection', here.lat, here.lng, 25);
        return proxyDB.mimoaCollection.find({},{thumb:1,lon:1,lat:1,freetext2:1,freeint1:1,title:1}).fetch();
    }
});
Template.postsList.events({
   'click button.loadbutton':function(){
       return subHandle.loadNextPage();
   }
});
