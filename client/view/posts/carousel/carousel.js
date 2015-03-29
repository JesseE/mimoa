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

