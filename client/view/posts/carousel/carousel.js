/**
 * Created by jesse on 16/03/15.
 */
Template.carousel.helpers({
    carousel: function() {
        var item = this.imageset[0].split(',');
        return item;
    },
    description: function() {
        var description = this.imagedescription[0].split(',');
        return description;
    }
});

Template.carousel.rendered = function(){
    $('div.item').first().addClass('active');
};
Template.carousel.events({
    'click #myCarousel': function() {
        var elem = document.getElementById("myCarousel");
        console.log(elem.requestFullscreen);
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    },
    'swipeleft #carousel': function(e, t) {
        e.preventDefault();
        console.log('left');
        //Do cool stuff here
    },
    'swiperight #carousel': function(e, t) {
        e.preventDefault();
        console.log('right');
        //Do cool stuff here
    }
});

