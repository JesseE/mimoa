/**
 * Created by jesse on 05/03/15.
 */
Template.postPageMap.helpers({

    exampleMapOptions: function() {
        // Make sure the maps API has loaded
        var here = Geolocation.currentLocation();
        if (GoogleMaps.loaded()) {
            // Map initialization options
            return {
                center: new google.maps.LatLng(this.lat, this.lon),
                zoom: 13,
                draggable: false
            };
        }
    }
});
Template.postPageMap.rendered = function() {
    GoogleMaps.ready('exampleMap', function(map) {
        // Add a marker to the map once it's ready
        var marker = new google.maps.Marker({
            position: map.options.center,
            map: map.instance
        });
    });
};

