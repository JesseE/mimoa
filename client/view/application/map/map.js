/**
 * Created by jesseeikema on 3/26/15.
 */
Markers = new Mongo.Collection('markers');

var locations = [];

Template.projectsMap.helpers({
    mapOptions: function() {
        var here = Geolocation.currentLocation();
        if(GoogleMaps.loaded()) {
            if (here.coords != null) {
                proxyDB.mimoaCollection.find({city: 'Amsterdam'}).forEach(function (project) {
                    GoogleMaps.ready('map', function (map) {
                        // Add a marker to the map once it's ready
                        var marker;
                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng(here.coords.latitude, here.coords.longitude),
                            map: map.instance
                        });
                        //for(var x=0, len=locations.length; x < len; x++){
                        marker = new google.maps.Marker({
                            position: new google.maps.LatLng(project.lat, project.lon),
                            map: map.instance
                        });
                        //}
                    });
                });
            }
        }
      // // Make sure the maps API has loaded
        var here = Geolocation.currentLocation();
        if(GoogleMaps.loaded()){
            if(here.coords != null){
            // Map initialization options
                return {
                    center: new google.maps.LatLng(here.coords.latitude, here.coords.longitude),
                    zoom: 13,
                    draggable: true
                };
            }
        }
    }
});
Template.projectsMap.onCreated = function() {


};
