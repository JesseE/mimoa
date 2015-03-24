/**
 * Created by jesse on 16/03/15.
 */
Template.carousel.helpers({
    carousel: function(){
        var item = this.imageset[0].split(',');
        return item;
    }
});
Template.carousel.rendered = function(){
    $('div.item').first().addClass('active');
};

Template.carousel.events({

});
