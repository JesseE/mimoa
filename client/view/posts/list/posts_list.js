Template.postsList.helpers({
    posts: function() {
        return proxyDB.mimoaCollection.find({},{sort:{title:1}});
    }
    //getProjects: function() {
    //    return ProjectSearch.getData({
    //        transform: function(matchText, regExp) {
    //            return matchText.replace(regExp, "<b>$&</b>")
    //        },
    //        sort: {title: 1}
    //    });
    //}
});

Template.postsList.rendered = function() {
    //Meteor.setInterval(function () {
    //    $('a.post-item').tsort('div.post', {data: "distance"});
    //}, 5000);
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