/**
 * Created by jesseeikema on 3/26/15.
 */
var marker;
var projectDescription;
var myLocationMarker;
var infowindow;

Template.projectsMap.helpers({
    mapOptions: function() {
        if(GoogleMaps.loaded()) {
            var here = Geolocation.currentLocation();
            var mimoaIcon = 'http://mimoa.eu/map/img/focus1.png';
            GoogleMaps.ready('map', function (map, limit) {

                proxyDB.mimoaCollection.find({},{limit:limit}).forEach(function (project, marker, infowindow) {
                    // Add a marker to the map once it's ready

                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(project.lat, project.lon),
                        icon: mimoaIcon,
                        map: map.instance
                    });

                    projectDescription = "<div><p>"+project.title+"</p><br><p>"+project.summary+"</p><br><a href="+'/posts/'+project.id+">this project</a></div>";

                    infowindow = new google.maps.InfoWindow({
                        content: projectDescription
                    });

                    google.maps.event.addListener(marker,'click', function(){
                        if(infowindow.getMap() != null){
                            infowindow.close();
                        }
                        infowindow.open(map.instance, marker);
                    });

                });
                if(here.coords != null){
                    myLocationMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(here.coords.latitude, here.coords.longitude),
                        icon: mimoaIcon,
                        map: map.instance
                    });
                }
            });
            // Map initialization options
            if(here.coords != null) {
                return {
                    center: new google.maps.LatLng(here.coords.latitude, here.coords.longitude),
                    zoom: 13,
                    icon: mimoaIcon,
                    draggable: true,
                    disableDefaultUI: true
                };
            }
        }
    }
});
