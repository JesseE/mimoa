/**
 * Created by jesse on 19/02/15.
 */
Template.postEdit.helpers({
    post:function(){
        return Posts.findOne(Session.get('currentPostId'));
    }
});

Template.postEdit.events({
    'submit form': function(e) {
        e.preventDefault();

        var currentPostId = this._id;

        var postProperties = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val()
        };

        Posts.update(currentPostId, {$set : postProperties}, function(error){
            if(error) {
                alert('does it break here?'+ error.reason );
            } else {
                Router.go('postPage', {_id: currentPostId});
            }
        });
    },
    'click .delete': function(e){
        e.preventDefault();
        if(confirm("Delete this post?")) {
            var currentPostId = Session.get('currentPostId');
            Posts.remove(currentPostId);
            Router.go('postsList');
        }
    }
});