/**
 * Created by jesse on 20/02/15.
 */

Template.postPage.helpers({
    mapOptions: function() {
        var here = Geolocation.currentLocation();
        if(GoogleMaps.loaded()) {
            var mimoaIcon = 'http://mimoa.eu/map/img/focus1.png';
            // Map initialization options;
            currentLocation = new google.maps.LatLng(here.coords.latitude, here.coords.longitude);
            return {
                center: currentLocation,
                zoom: 13,
                icon: mimoaIcon,
                draggable: true,
                disableDefaultUI: true
            };
        }
    }
});
Template.postPage.onCreated(function(){
    GoogleMaps.ready('map', function (map, limit) {
        var mimoaIcon = 'http://mimoa.eu/map/img/focus1.png';
        proxyDB.mimoaCollection.find({}, {limit: limit}).forEach(function (project, marker, infowindow) {
            // Add a marker to the map once it's ready

            marker = new google.maps.Marker({
                position: new google.maps.LatLng(project.lat, project.lon),
                icon: mimoaIcon,
                map: map.instance
            });

            projectDescription = "<div><p>" + project.title + "</p><br><p>" + project.summary + "</p><br><a href=" + '/posts/' + project.id + ">this project</a></div>";

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

        //this needs to change to current location
        myLocationMarker = new google.maps.Marker({
            position: new google.maps.LatLng(52.3478951,4.8499109),
            icon: mimoaIcon,
            map: map.instance
        });
    });
});