/**
 * Created by jesseeikema on 3/30/15.
 */
Template.addNewProject.events({
    'submit form' : function(e) {
        e.preventDefault();
        var selectedFile = document.getElementById('input').files[0];
        console.log(selectedFile);
        var post = {
            id: Random.id(),
            author: [ $(e.target).find("[name=author]").val() ],
            title: [ $(e.target).find("[name=title]").val() ],
            summary: [ $(e.target).find("[name=description]").val() ],
            image1: [  selectedFile ],
            imageset: [ $(e.target).find("[name=imageset]").val() ],
            lat: [ $(e.target).find("[name=latitude]").val() ],
            lon: [ $(e.target).find("[name=longitude]").val() ],
            freeint1 : [ {_:$(e.target).find("[name=rating]").val()}],
            country: ['Netherlands'],
            city: ['Amsterdam']
        };
       //return Meteor.call('addNewProject', post, function(err, result){
       //     if(result){
       //         console.log(result);
       //     }
       //});
    },
    'click button.take-picture': function() {
        MeteorCamera.getPicture(function(err, data){
            console.log(err, data);
            return Session.set('imagesrc', data);
        });
    }
});
Template.addNewProject.helpers({
    lat: function(){
        var hereBrowser = Geolocation.currentLocation();
        if(hereBrowser != null){
            if(GoogleMaps.loaded()) {
                return hereBrowser.coords.latitude;
            }
        }
    },
    lon:function(){
        var hereBrowser = Geolocation.currentLocation();
        if(hereBrowser != null){
            if(GoogleMaps.loaded()){
                return hereBrowser.coords.longitude;
            }
        }
    },
    thumbimage: function() {
        console.log(Session.get('imagesrc'));
        return Session.get('imagesrc');
    }
});