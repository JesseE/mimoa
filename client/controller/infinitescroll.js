/**
 * Created by jesse on 16/03/15.
 */
var handle = Meteor.subscribeWithPagination('mimoacollection', 25);
//lol
//check if at bottom of page
window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        //load next page
        handle.loadNextPage();
        if(handle.loadNextPage){
            var pixelsSrolled = $(window).height();
            window.scrollTo(0,0);
            console.log('new page loaded and scrolled :' + pixelsSrolled);

        }
    }
};