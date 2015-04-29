/**
 * Created by jesse on 16/03/15.
 */
Template.carousel.helpers({
    carousel: function() {
        var item = this.imageset[0].split(',');
        return item;
    },
    description: function() {
        var description = this.imagedescription;
        console.log(description);
        return description;
    }
});

Template.carousel.rendered = function(){
    $('div.item').first().addClass('active');
    bucket = $('.item');
};

Template.carousel.events({
    'click #myCarouselImage': function() {
        var elem = document.getElementById("myCarouselImage");
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
var bucket = [];
var index = 0;

Template.carousel.gestures({
    'swipeleft #myCarousel': function (event, template) {
        console.log('swipeleft');
        index++;
        if(index == bucket.length){
            index = 0;
            bucket.next().addClass('active');
        } else {
            bucket.prev().removeClass('active');
        }
        console.log(index);

    },
    'swiperight #myCarousel': function (event, template) {
        index--;

        if(index == 0){
            index = bucket.length;
            bucket.next().addClass('active');
        } else {
            bucket.prev().removeClass('active');
        }
        console.log(index);
        bucket.siblings().next().addClass('active');
        bucket.siblings().prev().removeClass('active');
        console.log('swiperight');
    }
});

