/**
 * Created by jesseeikema on 6/25/15.
 */
var directionService;
var myCurrentLocation;
var myCurrentDestination;
var directionsDisplay;
var projectCoords;
var projectsLength;

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
Template.collectionRoute.helpers({
    exampleMapOptions: function() {
        var projectContainer = [];
        proxyDB.mimoaUsersFavoritesCollection.find({userID:Meteor.userId()}).forEach(function (project, marker, infowindow) {
            projectCoords = new google.maps.LatLng(project.project.lat[0],project.project.lon[0]);
            projectContainer.push({location:projectCoords});
        });
        //if(projectCoords != null) {
            if (GoogleMaps.loaded()) {
                directionsDisplay = new google.maps.DirectionsRenderer();
                directionService = new google.maps.DirectionsService();
                projectsLength = projectContainer.length - 1;

                var request = {
                    origin: myCurrentLocation = new google.maps.LatLng(currentLat,currentLng),
                    waypoints:projectContainer,
                    optimizeWaypoints: true,
                    destination: myCurrentDestination = new google.maps.LatLng(projectContainer[projectsLength].location.A, projectContainer[projectsLength].location.F),
                    travelMode: google.maps.TravelMode.WALKING
                };

                directionService.route(request, function(response,status){
                    if(status == google.maps.DirectionsStatus.OK){
                        directionsDisplay.setDirections(response);
                    }
                });
                // Map initialization options
                return {
                    center: new google.maps.LatLng(currentLat, currentLng),
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

