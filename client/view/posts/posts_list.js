newLocalCollection = new Meteor.Collection( null );
Template.postsList.events ({
    'click .nearby-button': function() {
        console.log('click');

    }
});
Template.postsList.helpers({
    posts: function() {
        var onlineCollection = proxyDB.mimoaCollection.find();
        return onlineCollection;
    }
});
//sessions

//$near?

//max distance
//min distance

Template.postsList.rendered = function() {
    Meteor.setInterval(function () {
        $('a.post-item').tsort('div.post', {data: "distance"});
    }, 500);
};

//    var city = [];
//// in wich city am I?
//    if(here) {
//        HTTP.call('GET', 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + here.coords.latitude + ',' + here.coords.longitude + '&key=' + apiKey + '', function (err, res) {
//            var result = JSON.stringify(res.data.results[0].address_components[3].long_name);
//            console.log(result);
//            city.push(result);
//        });
//    }