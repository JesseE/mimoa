/**
 * Created by jesseeikema on 3/25/15.
 */
Template.footer.events ({
    'click .nearby-button': function() {
        $('a.post-item').tsort('div.post', {data: "distance"});
        window.scrollTo(0,0);
    }
    //'submit form' : _.throttle(function(e) {
    //
    //    var text = $(e.target).val().trim();
    //    ProjectSearch.search(text);
    //
    //
    //
    //    //var projectTitle = $(e.target).find("[name=title]").val();
    //    //console.log(projectTitle);
    //    //e.preventDefault();
    //    //return Meteor.call('searchProject', projectTitle, function(err, result){
    //    //    if(result){
    //    //        console.log(result);
    //    //    }
    //    //});
    //},200)
});
