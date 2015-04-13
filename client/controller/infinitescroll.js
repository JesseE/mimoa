/**
 * Created by jesse on 16/03/15.
 */
var handle = Meteor.subscribeWithPagination('mimoacollection', 15);

window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        //load next page
        handle.loadNextPage();

        if(handle.loadNextPage){
            $('a.post-item').tsort('div.post', {data: "distance"});
        }

        handle.ready();
        if(handle.ready()){
            handle.stop();
        }
    }
};