/**
 * Created by jesse on 20/02/15.
 */
Template.commentSubmit.events({
    'submit form': function(e, template) {
        e.preventDefault();

        var $body = $(e.target).find('[name="body"]');

        var commentAttributes = {
            body : $body.val(),
            postId : this.id
        };
        Meteor.call('comments', commentAttributes, function(error, commentId){
            if(error){
                throwError(error.reason);
            }else{
                $body.val('');
            }
        });
    }
});