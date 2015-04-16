/**
 * Created by jesseeikema on 4/16/15.
 */
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
};