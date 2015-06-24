/**
 * Created by jesse on 05/03/15.
 */
var directionService;
var myCurrentLocation;
var myCurrentDestination;
var directionsDisplay;

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
Template.postPageMap.helpers({
    exampleMapOptions: function() {
        var projectLat;
        var projectLng;
            projectLat = this.lat;
            projectLng = this.lon;
            console.log(projectLat,projectLng);
        if(currentLat != null) {
            if (GoogleMaps.loaded()) {
            directionsDisplay = new google.maps.DirectionsRenderer();
                directionService = new google.maps.DirectionsService();
                var request = {
                    origin: myCurrentLocation = new google.maps.LatLng(currentLat, currentLng),
                    destination: myCurrentDestination = new google.maps.LatLng(projectLat, projectLng),
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
        }
    }
});

Template.postPageMap.onCreated(function() {
    GoogleMaps.ready('exampleMap', function(map) {
        return directionsDisplay.setMap(map.instance);
    });
});


