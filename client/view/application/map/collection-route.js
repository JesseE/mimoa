/**
 * Created by jesseeikema on 6/25/15.
 */
var marker;
var projectDescription;
var myLocationMarker;
var infowindow;
var map;
var currentLocation;
var mimoaIcon = 'http://mimoa.eu/map/img/focus1.png';

var myCurrentCountry;
var myCurrentCity;
var currentLat;
var currentLng;
var paginationNumber = 25;
var subHandle;
var hereIcon = '/public/images/you-are-here/web/ic_location_on_black_24dp_2x.png';
var directionService;
var myCurrentLocation;
var myCurrentDestination;
var directionsDisplay;
var projectCoords;
var projectsLength;
var currentLat;
var currentLng;
Meteor.startup(function(){
    function success(pos) {
        var crd = pos.coords;
        currentLat = crd.latitude;
        currentLng = crd.longitude;
        localStorage["currentSavedLat"] = JSON.stringify(currentLat);
        localStorage["currentSavedLng"] = JSON.stringify(currentLng);
    }
    function error(err) {
        console.log(err);
    }
    navigator.geolocation.getCurrentPosition(success, error);
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/client/controller/sw.js').then(function(registration) {
            // Registration was successful
            console.log('ServiceWorker registration successful with scope: ',    registration.scope);
        }).catch(function(err) {
            // registration failed :(
            console.log('ServiceWorker registration failed: ', err);
        });
    }
});
var rendererOptions = {
    draggable: true
};

Template.collectionRoute.helpers({
    exampleMapOptions: function() {
        var projectContainer = [];
        var storedLocation;
        //proxyDB.mimoaUsersFavoritesCollection.find({userID:Meteor.userId()}).forEach(function (project, marker, infowindow) {
        var listName = Router.current().params.listName;
        foo.find({name:listName}).forEach(function (project, marker, infowindow) {
            console.log(project);
            localStorage["projectCoordsLat"]= JSON.stringify(project.project.lat[0]);
            //localStorage.setItem('projectCoordsLat',JSON.stringify(project.project.lat[0]));
            localStorage["projectCoordsLng"]= JSON.stringify(project.project.lon[0]);
            //localStorage.setItem('projectCoordsLng',JSON.stringify(project.project.lon[0]));
            //projectCoords = new google.maps.LatLng(project.project.lat[0],project.project.lon[0]);
            projectCoords = new google.maps.LatLng(JSON.parse(localStorage["projectCoordsLat"]),JSON.parse(localStorage["projectCoordsLng"]));
            //localStorage["projectCoords"] = JSON.stringify(projectCoords);
            //storedLocation = JSON.parse(localStorage["projectCoords"]);
            projectContainer.push({location:projectCoords});
        });

        //console.log(projectContainer);
        //localStorage["projectCoordsLength"] = JSON.stringify(projectContainer.length);
        //var storedLocationContainer=[];
        //for (var i = 0, len = projectContainer.length; i < len; i++) {
        //    var results = projectContainer[i];
        //    localStorage["projectCoords"] = JSON.stringify([results.location.A,results.location.F]);
        //    storedLocation = JSON.parse(localStorage["projectCoords"]);
        //    console.log(storedLocation);
        //    //storedLocationContainer.push(storedLocation);
        //}
        //var latCont;
        //var lngCont;
        //for (var i = 0, len = projectContainer.length; i < len; i++) {
        //        latCont = JSON.stringify(projectContainer[i].location.A);
        //        lngCont = JSON.stringify(projectContainer[i].location.F);
        //
        //    //localStorage["offlineProjectCoordsLat"] = JSON.stringify(projectContainer[i].location.A);
        //        //localStorage["offlineProjectCoordsLng"] = JSON.stringify(projectContainer[i].location.F);
        //}
        //localStorage["offlineProjectCoordsLat"] = latCont;
        //localStorage["offlineProjectCoordsLng"] = lngCont;
        //
        //localStorage["offlineProjectCoords"] = [    localStorage["offlineProjectCoordsLat"], localStorage["offlineProjectCoordsLng"]   ];
        //
        //storedLocation = JSON.parse(localStorage["offlineProjectCoords"]);
        //console.log(storedLocation);
        //console.log(projectContainer);
        //var projectContainer =
        //if(projectCoords != null) {
            if (GoogleMaps.loaded()) {
                directionsDisplay = new google.maps.DirectionsRenderer();
                directionService = new google.maps.DirectionsService();
                projectsLength = projectContainer.length - 1;
                directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
                localStorage["projectCoordsLengthA"] = JSON.stringify(projectContainer[projectsLength].location.A);
                localStorage["projectCoordsLengthF"] = JSON.stringify(projectContainer[projectsLength].location.F);

                //var myCurrentLocationMarker = new google.maps.Marker({
                //    position:,
                //    map:map
                //});
                var request = {
                    origin: myCurrentLocation = new google.maps.LatLng(localStorage.getItem('currentSavedLat'), localStorage.getItem('currentSavedLng')),
                    waypoints:projectContainer,
                    optimizeWaypoints: true,
                    destination: myCurrentDestination = new google.maps.LatLng(JSON.parse(localStorage["projectCoordsLengthA"]),JSON.parse(localStorage["projectCoordsLengthF"])),
                    travelMode: google.maps.TravelMode.WALKING
                };

                directionService.route(request, function(response,status){
                    if(status == google.maps.DirectionsStatus.OK){
                        //localStorage.setItem('offlineDirections',response.routes[0].overview_polyline);
                        //localStorage.setItem('offlineDirections',response.routes[0].overview_polyline);
                        //var offlineDirectionsLine = localStorage.getItem('offlineDirectionsPath');
                        //directionsDisplay.setDirections(offlineDirectionsLine);
                        directionsDisplay.setDirections(response);
                        //directionsDisplay.setDirections(localStorage.getItem('offlineDirections'));
                        //console.log(directionsDisplay.setDirections(response));
                    //} else{
                        //var offlineDirectionsLine = localStorage.getItem('offlineDirectionsPath');
                        //return directionsDisplay.setDirections(offlineDirectionsLine);
                    }
                });

                //var decodePath = google.maps.geometry.encoding.decodePath(localStorage.getItem('offlineDirections'));
                //localStorage.setItem('offlineDirectionsPath', decodePath);

                google.maps.event.addListener(directionsDisplay, 'directions_changed', function(evt) {
                    computeTotalDistance(directionsDisplay.getDirections());
                });

                function computeTotalDistance(result) {
                    var total = 0;
                    var myroute = result.routes[0];
                    for (var i = 0; i < myroute.legs.length; i++) {
                        total += myroute.legs[i].distance.value;
                    }
                    total = total / 1000.0;
                }

                // Map initialization options
                return {
                    center: new google.maps.LatLng(localStorage.getItem('currentSavedLat'), localStorage.getItem('currentSavedLng')),
                    zoom: 13,
                    draggable: true,
                    raiseOnDrag: true,
                    disableDefaultUI: true
                };
            }
//        }
    }
});


Template.collectionRoute.onCreated(function() {
    Tracker.autorun(function(){

            var projectContainer = [];
            var storedLocation;
            //proxyDB.mimoaUsersFavoritesCollection.find({userID:Meteor.userId()}).forEach(function (project, marker, infowindow) {
            var listName = Router.current().params.listName;
            foo.find({name:listName}).forEach(function (project, marker, infowindow) {
                console.log(project);
                localStorage["projectCoordsLat"]= JSON.stringify(project.project.lat[0]);
                //localStorage.setItem('projectCoordsLat',JSON.stringify(project.project.lat[0]));
                localStorage["projectCoordsLng"]= JSON.stringify(project.project.lon[0]);
                //localStorage.setItem('projectCoordsLng',JSON.stringify(project.project.lon[0]));
                //projectCoords = new google.maps.LatLng(project.project.lat[0],project.project.lon[0]);
                projectCoords = new google.maps.LatLng(JSON.parse(localStorage["projectCoordsLat"]),JSON.parse(localStorage["projectCoordsLng"]));
                //localStorage["projectCoords"] = JSON.stringify(projectCoords);
                //storedLocation = JSON.parse(localStorage["projectCoords"]);
                projectContainer.push({location:projectCoords});
            });

            //console.log(projectContainer);
            //localStorage["projectCoordsLength"] = JSON.stringify(projectContainer.length);
            //var storedLocationContainer=[];
            //for (var i = 0, len = projectContainer.length; i < len; i++) {
            //    var results = projectContainer[i];
            //    localStorage["projectCoords"] = JSON.stringify([results.location.A,results.location.F]);
            //    storedLocation = JSON.parse(localStorage["projectCoords"]);
            //    console.log(storedLocation);
            //    //storedLocationContainer.push(storedLocation);
            //}
            //var latCont;
            //var lngCont;
            //for (var i = 0, len = projectContainer.length; i < len; i++) {
            //        latCont = JSON.stringify(projectContainer[i].location.A);
            //        lngCont = JSON.stringify(projectContainer[i].location.F);
            //
            //    //localStorage["offlineProjectCoordsLat"] = JSON.stringify(projectContainer[i].location.A);
            //        //localStorage["offlineProjectCoordsLng"] = JSON.stringify(projectContainer[i].location.F);
            //}
            //localStorage["offlineProjectCoordsLat"] = latCont;
            //localStorage["offlineProjectCoordsLng"] = lngCont;
            //
            //localStorage["offlineProjectCoords"] = [    localStorage["offlineProjectCoordsLat"], localStorage["offlineProjectCoordsLng"]   ];
            //
            //storedLocation = JSON.parse(localStorage["offlineProjectCoords"]);
            //console.log(storedLocation);
            //console.log(projectContainer);
            //var projectContainer =
            //if(projectCoords != null) {
            if (GoogleMaps.loaded()) {
                directionsDisplay = new google.maps.DirectionsRenderer();
                directionService = new google.maps.DirectionsService();
                projectsLength = projectContainer.length - 1;
                directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
                localStorage["projectCoordsLengthA"] = JSON.stringify(projectContainer[projectsLength].location.A);
                localStorage["projectCoordsLengthF"] = JSON.stringify(projectContainer[projectsLength].location.F);

                //var myCurrentLocationMarker = new google.maps.Marker({
                //    position:,
                //    map:map
                //});
                var request = {
                    origin: myCurrentLocation = new google.maps.LatLng(localStorage.getItem('currentSavedLat'), localStorage.getItem('currentSavedLng')),
                    waypoints:projectContainer,
                    optimizeWaypoints: true,
                    destination: myCurrentDestination = new google.maps.LatLng(JSON.parse(localStorage["projectCoordsLengthA"]),JSON.parse(localStorage["projectCoordsLengthF"])),
                    travelMode: google.maps.TravelMode.WALKING
                };

                directionService.route(request, function(response,status){
                    if(status == google.maps.DirectionsStatus.OK){
                        //localStorage.setItem('offlineDirections',response.routes[0].overview_polyline);
                        //localStorage.setItem('offlineDirections',response.routes[0].overview_polyline);
                        //var offlineDirectionsLine = localStorage.getItem('offlineDirectionsPath');
                        //directionsDisplay.setDirections(offlineDirectionsLine);
                        directionsDisplay.setDirections(response);
                        //directionsDisplay.setDirections(localStorage.getItem('offlineDirections'));
                        //console.log(directionsDisplay.setDirections(response));
                        //} else{
                        //var offlineDirectionsLine = localStorage.getItem('offlineDirectionsPath');
                        //return directionsDisplay.setDirections(offlineDirectionsLine);
                    }
                });

                //var decodePath = google.maps.geometry.encoding.decodePath(localStorage.getItem('offlineDirections'));
                //localStorage.setItem('offlineDirectionsPath', decodePath);

                google.maps.event.addListener(directionsDisplay, 'directions_changed', function(evt) {
                    computeTotalDistance(directionsDisplay.getDirections());
                });

                function computeTotalDistance(result) {
                    var total = 0;
                    var myroute = result.routes[0];
                    for (var i = 0; i < myroute.legs.length; i++) {
                        total += myroute.legs[i].distance.value;
                    }
                    total = total / 1000.0;
                }

                // Map initialization options
                return {
                    center: new google.maps.LatLng(localStorage.getItem('currentSavedLat'), localStorage.getItem('currentSavedLng')),
                    zoom: 13,
                    draggable: true,
                    raiseOnDrag: true,
                    disableDefaultUI: true
                };
            }
//        }

    });

    GoogleMaps.ready('exampleMap', function(map) {
        return directionsDisplay.setMap(map.instance);
    });
});

