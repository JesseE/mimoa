/**
 * Created by jesse on 05/03/15.
 */
var directionService;
var myCurrentLocation;
var myCurrentDestination;
var directionsDisplay;

Template.postPageMap.helpers({
    exampleMapOptions: function() {
        // Make sure the maps API has loaded

        directionsDisplay = new google.maps.DirectionsRenderer();
        if (GoogleMaps.loaded()) {
            var here = Geolocation.currentLocation();
            if (here.coords != null) {
                directionService = new google.maps.DirectionsService();

                var request = {
                    origin: myCurrentLocation = new google.maps.LatLng(here.coords.latitude, here.coords.longitude),
                    destination: myCurrentDestination = new google.maps.LatLng(this.lat, this.lon),
                    travelMode: google.maps.TravelMode.WALKING
                };

                directionService.route(request, function(response,status){

                    if(status == google.maps.DirectionsStatus.OK){
                        directionsDisplay.setDirections(response);
                    }
                });
            }
            if(here.coords != null){
                // Map initialization options
                return {
                    center: new google.maps.LatLng(here.coords.latitude, here.coords.longitude),
                    zoom: 13,
                    draggable: false
                };
            }
        }
    }
});

Template.postPageMap.rendered = function() {
    GoogleMaps.ready('exampleMap', function(map) {
        // Add a marker to the map once it's ready
        //var marker = new google.maps.Marker({
        //    position: map.options.center,
        //    map: map.instance
        //});
        directionsDisplay.setMap(map.instance);
    });
};


