/**
 * Created by jesseeikema on 6/25/15.
 */
var directionService;
var myCurrentLocation;
var myCurrentDestination;
var directionsDisplay;
var projectCoords;
var projectsLength;
var currentLat;
var currentLng;
Meteor.startup(function(){
    function success(pos) {
        var crd = pos.coords;
        currentLat = crd.latitude;
        currentLng = crd.longitude;
        localStorage["currentSavedLat"] = currentLat;
        localStorage["currentSavedLng"] = currentLng;
    }
    function error(err) {
        console.log(err);
    }
    navigator.geolocation.getCurrentPosition(success, error);
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/client/controller/sw.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ',    registration.scope);
        }).catch(function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    }
});
var rendererOptions = {
    draggable: true
};


Template.collectionRoute.helpers({
    exampleMapOptions: function() {
        var projectContainer = [];
        proxyDB.mimoaUsersFavoritesCollection.find({userID:Meteor.userId()}).forEach(function (project, marker, infowindow) {
            localStorage["projectCoordsLat"]= JSON.stringify(project.project.lat[0]);
            localStorage["projectCoordsLng"]= JSON.stringify(project.project.lon[0]);
            //projectCoords = new google.maps.LatLng(project.project.lat[0],project.project.lon[0]);
            projectCoords = new google.maps.LatLng(JSON.parse(localStorage["projectCoordsLat"]),JSON.parse(localStorage["projectCoordsLng"]));
            console.log(projectCoords);
            projectContainer.push({location:projectCoords});
        });
        localStorage["projectCoordsLength"] = JSON.stringify(projectContainer.length);

        //if(projectCoords != null) {
            if (GoogleMaps.loaded()) {
                directionsDisplay = new google.maps.DirectionsRenderer();
                directionService = new google.maps.DirectionsService();
                projectsLength = projectContainer.length - 1;
                directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
                localStorage["projectCoordsLengthA"] = JSON.stringify(projectContainer[projectsLength].location.A);
                localStorage["projectCoordsLengthF"] = JSON.stringify(projectContainer[projectsLength].location.F);
                console.log(projectContainer);
                var request = {
                    origin: myCurrentLocation = new google.maps.LatLng(localStorage.getItem('currentSavedLat'), localStorage.getItem('currentSavedLng')),
                    waypoints:projectContainer,
                    optimizeWaypoints: true,
                    destination: myCurrentDestination = new google.maps.LatLng(JSON.parse(localStorage["projectCoordsLengthA"]),JSON.parse(localStorage["projectCoordsLengthF"])),
                    travelMode: google.maps.TravelMode.WALKING
                };

                directionService.route(request, function(response,status){
                    if(status == google.maps.DirectionsStatus.OK){
                        directionsDisplay.setDirections(response);
                        //localStorage.setItem('offlineDirections',directionsDisplay.setDirections(response));
                        //console.log(response.routes[0].overview_polyline);
                    }
                });

                google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
                    computeTotalDistance(directionsDisplay.getDirections());
                });

                function computeTotalDistance(result) {
                    var total = 0;
                    var myroute = result.routes[0];
                    for (var i = 0; i < myroute.legs.length; i++) {
                        total += myroute.legs[i].distance.value;
                    }
                    total = total / 1000.0;
                }

                console.log(localStorage.getItem('currentSavedLat'), localStorage.getItem('currentSavedLng'));
                // Map initialization options
                return {
                    center: new google.maps.LatLng(localStorage.getItem('currentSavedLat'), localStorage.getItem('currentSavedLng')),
                    zoom: 13,
                    draggable: true,
                    disableDefaultUI: true
                };
            }
//        }
    }
});


Template.collectionRoute.onCreated(function() {
    GoogleMaps.ready('exampleMap', function(map) {
        return directionsDisplay.setMap(map.instance);
    });
});

