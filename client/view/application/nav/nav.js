
Template.nav.events({
    'click .nearby-button': function() {
        Meteor.setTimeout(function() {
            return $('a.post-item').tsort('div.post', {data: "distance"});
        },3000);
    }
});