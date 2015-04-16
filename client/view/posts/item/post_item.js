/**
 * Created by jesse on 19/02/15.
 */
Template.postItem.helpers({
    currentDistance: function() {
        var hereBrowser = Geolocation.currentLocation();
        if(hereBrowser != null){
            if(GoogleMaps.loaded()){
                var currentLocation = new google.maps.LatLng(hereBrowser.coords.latitude, hereBrowser.coords.longitude);
                var objectLocation = new google.maps.LatLng(this.lat[0],this.lon[0]);
                var distanceToLocation = JSON.parse((google.maps.geometry.spherical.computeDistanceBetween(currentLocation, objectLocation)).toFixed(0));
                orderByDistance();
                return distanceToLocation;
            }
        }
    }
});
function orderByDistance () {
    Meteor.setTimeout(function () {
        $('a.post-item').tsort('div.post', {data: 'distance'});
    }, 500);
}