
Template.nav.events({
    'click .nearby-button': function() {
        $('a.post-item').tsort('div.post', {data: "distance"});
        window.scrollTo(0,0);
    }
});