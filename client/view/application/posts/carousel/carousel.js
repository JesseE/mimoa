/**
 * Created by jesse on 16/03/15.
 */
var index = 0;
bucket = [];
Template.carousel.rendered = function(){
    $('div.item').first().addClass('active');
    bucket = $('.item');
};
Template.carousel.helpers({
    carousel: function() {
        var hereInApp = Router.current().route.getName();
        if(hereInApp == 'postPage'){
            var item = this.imageset[0].split(',');
            return item;
        } else {
            var item = this.project.imageset[0].split(',');
            return item;
        }
    },
    templateGestures: {
        'swiperight #myCarousel': function (event, templateInstance) {
            //$(this).carousel('prev');
            console.log('right');
            $('.ccarousel-inner').data('prev');
        },
        'swipeleft #myCarousel': function() {
          //  $(this).carousel('next');
            console.log('left');
        }
    },
    description: function() {
        var description = this.imagedescription;
        console.log(description);
        return description;
    }
});
Template.carousel.events({
    'click #myCarouselImage': function() {
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
    'tap #myCarouselImage': function() {
        var elem = document.getElementById("myCarousel");
        console.log(elem.requestFullscreen);
        console.log('tapped that');
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
