/**
 * Created by jesse on 20/02/15.
 */
Template.commentSubmit.events({
    'submit form': function(e, template) {
        e.preventDefault();

        var bodytext = $(e.target).find('[name="body"]');
        var username = $(e.target).find('[name="username"]');

        var commentAttributes = {
            body : bodytext.val(),
            postId : this.id,
            username: username.val(),
            submittedDate: new Date().getTime()
        };
        Meteor.call('comments', commentAttributes, function(error){
            if(error){
                throwError(error.reason);
            }else{
                bodytext.val('');
            }
        });
    }
});