var marker;
var projectDescription;
var myLocationMarker;
var infowindow;
var map;
var currentLocation;
var mimoaIcon = 'http://mimoa.eu/map/img/focus1.png';

var myCurrentCountry;
var myCurrentCity;
var currentLat;
var currentLng;

Meteor.startup(function(){
    function success(pos) {
        var crd = pos.coords;
        currentLat = crd.latitude;
        currentLng = crd.longitude;
    }
    function error(err) {
        console.log(err);
    }
    navigator.geolocation.getCurrentPosition(success, error);
});

Template.projectsMap.helpers({
    mapOptions: function() {
            if(GoogleMaps.loaded()) {
                // Map initialization options;
                return {
                    center: new google.maps.LatLng(currentLat,currentLng),
                    zoom: 13,
                    icon: mimoaIcon,
                    draggable: true,
                    disableDefaultUI: true
                };
            }
    }
});
Template.projectsMap.onCreated(function(){
    GoogleMaps.ready('map', function (map, limit) {
        proxyDB.mimoaCollection.find({}, {limit: limit}).forEach(function (project, marker, infowindow) {
            // Add a marker to the map once it's ready
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(project.lat, project.lon),
                icon: mimoaIcon,
                map: map.instance
            });
            projectDescription = "<div><a href=" + '/posts/' + project.id +"><h4>"+ project.title +"</h4></a><img src="+''+project.thumb[0]+"></div>";

            infowindow = new google.maps.InfoWindow({
                content: projectDescription
            });
            google.maps.event.addListener(marker, 'click', function () {
                if (infowindow.getMap() != null) {
                    infowindow.close();
                }
                infowindow.open(map.instance, marker);

            });

        });
        myLocationMarker = new google.maps.Marker({
            position: new google.maps.LatLng(currentLat,currentLng),
            icon: mimoaIcon,
            map: map.instance,
            draggable: true
        });
        google.maps.event.addListener(myLocationMarker, 'dragend', function(evt) {
            currentLat = evt.latLng.lat().toFixed(3);
            currentLng = evt.latLng.lng().toFixed(3);
            subHandle = Meteor.subscribeWithPagination('mimoacollection', currentLat, currentLng, 25);
        });
    });
});