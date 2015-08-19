/**
 * Created by jesse on 16/03/15.
 */
var index = 0;
var item = {};
var bucket = [];
var thisItem = {};
var thisItemIndicator = {};
var bucketIndicator = [];
Template.carousel.rendered = function(){
    $('div.item').first().addClass('active');
    bucket = $('.item');
    bucketIndicator = $('.item-indicator');
};
Template.carousel.helpers({
    carousel: function() {
        item = this.imageset[0].split(',');
        return item;
    },
    carousel1: function() {
        item = this.project.imageset[0].split(',');
        return item;
    },
    carousel2: function() {
        console.log(JSON.stringify(this.project.project.imageset[0]));
        item = this.project.project.imageset[0].split(',');
        console.log(item);
        return item;
    },
    description: function() {
        var description = this.imagedescription;
        console.log(description);
        return description;
    },
    templateGestures:{
        'swiperight #myCarousel': function(e, t) {
            if(index == bucket.length){
                return index = 0;
            }
            thisItem = bucket[index];
            thisItemIndicator = bucketIndicator[index];
            $('.item-indicator').removeClass('active');
            $('.item').removeClass('active');
            $(thisItemIndicator).removeClass('active');
            $(thisItem).removeClass('active');
            index+=1;
            console.log(index);
            $(thisItemIndicator).addClass('active');
            $(thisItem).addClass('active');
            $(thisItem).removeClass('animated fadeInRight');
            $(thisItem).addClass('animated fadeInLeft');
        },
        'swipeleft #myCarousel': function(e, t) {
            if(index == -1){
                return index = bucket.length - 1;
            }
            thisItem = bucket[index];
            thisItemIndicator = bucketIndicator[index];
            $('.item-indicator').removeClass('active');
            $('.item').removeClass('active');
            $(thisItemIndicator).removeClass('active');
            $(thisItem).removeClass('active');
            index-=1;
            console.log(index);
            $(thisItemIndicator).addClass('active');
            $(thisItem).addClass('active');
            $(thisItem).removeClass('animated fadeInLeft');
            $(thisItem).addClass('animated fadeInRight');

        }
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
