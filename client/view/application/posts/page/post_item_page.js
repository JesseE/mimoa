///**
// * Created by jesse on 13/03/15.
// */
//var ratingValue = [];
//Template.postItemPage.helpers({
//    shareData: function() {
//        return {
//            title: this.title,
//            summary: this.summary,
//            image : this.image1
//        }
//    },
//    website: function(){
//        if(this.website[0] == ""){
//            return false;
//        } else{
//            return this.website;
//        }
//    }
//});
//Template.postItemPage.events({
//    'click div.add-to-favorite':function(){
//        var projectId = this.id;
//        //var projectName = this.title;
//        //var projectImage = this.thumb;
//        var thisProject = this;
//        return Meteor.call('addToMyFavorite',projectId, thisProject, function(err,results){
//            console.log('add to my favorites');
//            if(err){console.log(err);}else{console.log(results);}
//        });
//    },
//    'click .post-content__title-photo-item': function() {
//        var elem = document.getElementById("myCarousel");
//        console.log(elem.requestFullscreen);
//        if (elem.requestFullscreen) {
//            elem.requestFullscreen();
//        } else if (elem.msRequestFullscreen) {
//            elem.msRequestFullscreen();
//        } else if (elem.mozRequestFullScreen) {
//            elem.mozRequestFullScreen();
//        } else if (elem.webkitRequestFullscreen) {
//            elem.webkitRequestFullscreen();
//        }
//    },
//    'tap .post-content__title-photo-item': function() {
//        var elem = document.getElementById("myCarousel");
//        console.log(elem.requestFullscreen);
//        console.log('tapped that');
//        if (elem.requestFullscreen) {
//            elem.requestFullscreen();
//        } else if (elem.msRequestFullscreen) {
//            elem.msRequestFullscreen();
//        } else if (elem.mozRequestFullScreen) {
//            elem.mozRequestFullScreen();
//        } else if (elem.webkitRequestFullscreen) {
//            elem.webkitRequestFullscreen();
//        }
//    },
//    'click button.remove-project': function() {
//        var thisPost = this;
//        Meteor.call('removeProject', thisPost, function(err, result) {
//            if(result) {
//                console.log(result);
//                Router.go('postsList');
//            }
//        });
//    },
//    'click .rating-icon-1' : function() {
//        ratingValue = [];
//        $('div#rating').removeClass();
//        $('div#rating').addClass('rating-1');
//        var currentRatingValue = 1;
//        var selectedDoc = this._id;
//        ratingValue.push(currentRatingValue);
//        return Meteor.call('updateRating', selectedDoc, ratingValue, function(err, result){
//            if(result){
//                console.log(result);
//            }
//        });
//    },
//    'click .rating-icon-2' : function() {
//        ratingValue = [];
//        $('div#rating').removeClass();
//        $('div#rating').addClass('rating-2');
//        var currentRatingValue = 2;
//        var selectedDoc = this._id;
//        ratingValue.push(currentRatingValue);
//        return Meteor.call('updateRating', selectedDoc, ratingValue, function(err, result){
//            if(result){
//                console.log(result);
//            }
//        });
//    },
//    'click .rating-icon-3' : function() {
//        ratingValue = [];
//        $('div#rating').removeClass();
//        $('div#rating').addClass('rating-3');
//        var currentRatingValue = 3;
//        var selectedDoc = this._id;
//        ratingValue.push(currentRatingValue);
//        return Meteor.call('updateRating', selectedDoc, ratingValue, function(err, result){
//            if(result){
//                console.log(result);
//            }
//        });
//    },
//    'click .rating-icon-4' : function() {
//        ratingValue = [];
//        $('div#rating').removeClass();
//        $('div#rating').addClass('rating-4');
//        var currentRatingValue = 4;
//        var selectedDoc = this._id;
//        ratingValue.push(currentRatingValue);
//        return Meteor.call('updateRating', selectedDoc, ratingValue, function(err, result){
//            if(result){
//                console.log(result);
//            }
//        });
//
//    },
//    'click .rating-icon-5' : function() {
//        ratingValue = [];
//        $('div#rating').removeClass();
//        $('div#rating').addClass('rating-5');
//        var currentRatingValue = 5;
//        var selectedDoc = this._id;
//        ratingValue.push(currentRatingValue);
//        return Meteor.call('updateRating', selectedDoc, ratingValue, function(err, result){
//            if(result){
//                console.log(result);
//            }
//        });
//    }
//});
//Template.postItemPage.rendered = function() {
//    window.scrollTo(0,0);
//};