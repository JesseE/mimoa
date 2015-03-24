/**
 * Created by jesse on 20/02/15.
 */
Template.comment.helpers({
    submittedText: function() {
        return new Date(this.submitted).toString();
    }
});