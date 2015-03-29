/**
 * Created by jesse on 20/02/15.
 */
Template.errors.helpers({
    errors: function() {
        return Errors.find();
    }
});