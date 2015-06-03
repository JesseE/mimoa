/**
 * Created by jesse on 16/03/15.
 */
var index = 0;
bucket = [];
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
    $('#myCarousel').hammer({
        drag_min_distance:0.5,
        threshold:5,
        swipe_velocity:0.5
    });
    $('#myCarousel').hammer().on('swipeleft', function(){
        $(this).carousel('next');
    });
    $('#myCarousel').hammer().on('swiperight', function(){
        $(this).carousel('prev');
    });
};
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
Template.carousel.gestures({
    //'swipeleft #myCarousel': function (event, template) {
    //    console.log('swipeleft');
    //    ++index;
    //    if(index == bucket.length){
    //        index = 0;
    //        bucket.next().addClass('active');
    //    } else {
    //        bucket.prev().removeClass('active');
    //    }
    //    bucket.removeClass('active');
    //    bucket.next().addClass('active');
    //    //bucket.siblings().next().addClass('active');
    //    //bucket.siblings().prev().removeClass('active');
    //    console.log(this.bucket,  bucket[index]);
    //},
    //'swiperight #myCarousel': function (event, template) {
    //    --index;
    //    if(index == 0){
    //        index = bucket.length;
    //        bucket.next().addClass('active');
    //    } else {
    //        bucket.prev().removeClass('active');
    //    }
    //    bucket.removeClass('active');
    //    bucket.prev().addClass('active');
    //    console.log('swiperight');
    //    console.log(bucket[index]);
    //}
});

