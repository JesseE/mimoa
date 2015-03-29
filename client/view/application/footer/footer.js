/**
 * Created by jesseeikema on 3/25/15.
 */


Template.footer.events ({
    'click .nearby-button': function(event) {
        $('a.post-item').tsort('div.post', {data: "distance"});
        window.scrollTo(0,0);
    },
    'click .search':function() {

    }
});
