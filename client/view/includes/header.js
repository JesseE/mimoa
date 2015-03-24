///**
// * Created by jesse on 04/03/15.
// */

Template.header.helpers({
    exampleMapOptions: function() {
        // Make sure the maps API has loaded
        var here = Geolocation.currentLocation();
        if (GoogleMaps.loaded()) {
            // Map initialization options
            return {
                center: new google.maps.LatLng(here.coords.latitude, here.coords.longitude),
                zoom: 13,
                draggable: false
            };
        }
    }});
Template.header.created = function() {
    GoogleMaps.ready('exampleMap', function(map) {
        // Add a marker to the map once it's ready
        var marker = new google.maps.Marker({
            position: map.options.center,
            map: map.instance
        });

    });
};