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
        var hereInApp = Router.current().route.getName();
        console.log(hereInApp);
        if(hereInApp == 'postPage' || 'postPageSearched'){
            item = this.imageset[0].split(',');
            return item;
        }
        if(hereInApp == 'myFavoritesItem' || 'myCuratorItem'){
            item = this.project.imageset[0].split(',');
            return item;
        }
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
