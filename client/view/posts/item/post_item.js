/**
 * Created by jesse on 19/02/15.
 */
var currentLocation;
var objectLocation;
var distanceToLocation;
Template.postItem.helpers({
    currentDistance: function() {
        //$('a.post-item').tsort('div.post', {data: 'distance'});
           var hereBrowser = Geolocation.currentLocation();
            if(hereBrowser != null){
                if(GoogleMaps.loaded()){
                    currentLocation = new google.maps.LatLng(hereBrowser.coords.latitude, hereBrowser.coords.longitude);
                    objectLocation = new google.maps.LatLng(this.lat[0],this.lon[0]);
                    distanceToLocation = JSON.parse((google.maps.geometry.spherical.computeDistanceBetween(currentLocation, objectLocation)).toFixed(0));
                    return distanceToLocation;
                }
            }
    }
});
