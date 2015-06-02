/**
 * Created by jesseeikema on 4/16/15.
 */
var index = 0;
bucket = [];
Template.carouselFull.helpers({
    carouselFull: function() {
        var item = this.imageset[0].split(',');
        return item;
    },
    description: function() {
        var description = this.imagedescription[0].split(',');
        return description;
    }
});

Template.carouselFull.rendered = function(){
    $('div.item').first().addClass('active');
    bucket = $('.item');
    $('#myCarouselFull').hammer({
        drag_min_distance:1,
        swipe_velocity:0.1
    });
    $('#myCarouselFull').hammer().on('swipeleft', function(){
        $(this).carousel('next');
    });
    $('#myCarouselFull').hammer().on('swiperight', function(){
        $(this).carousel('prev');
    });
};
Template.carouselFull.events({
    'click #myCarouselImage': function() {
        var elem = document.getElementById("myCarousel");
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        } else if (elem.mozRequestFullScreen) {
            elem.mozRequestFullScreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    }
});

