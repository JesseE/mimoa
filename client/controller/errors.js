/**
 * Created by jesse on 20/02/15.
 */
Errors = new Meteor.Collection(null);

throwError = function(message){
    Errors.insert({message : message})
};