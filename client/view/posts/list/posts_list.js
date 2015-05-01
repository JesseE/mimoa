$(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        $('.loadbutton').show();
    } else {
        $('.loadbutton').hide();
    }
});
Template.postsList.helpers({
    posts: function() {
       // return proxyDB.mimoaCollection.find({},{fields: {id:1,title:1,thumb:1,freetext2:1,freeint1:1,lon:1,lat:1}});
        return proxyDB.mimoaCollection.find({});
    }
});
Template.postsList.events({
   'click button.loadbutton':function(){
       return subHandle.loadNextPage();
   }
});
Template.postsList.rendered = function() {
    //Meteor.setInterval(function () {
        //$('a.post-item').tsort('div.post', {data: "distance"});
    //}, 5000);
};
