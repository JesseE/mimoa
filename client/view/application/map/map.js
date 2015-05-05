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
        console.log(currentLat);
    }
    function error(err) {
        console.log(err);
        //console.warn('ERROR(' + err.code + '): ' + err.message);
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
            var projectSummary = project.summary;
            var pS = projectSummary[0].substring(10);

            projectDescription = "<div><p>" + project.title + "</p><br><p>" +  pS  + "</p><br><a href=" + '/posts/' + project.id + ">this project</a></div>";

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
            map: map.instance
        });
    });
});