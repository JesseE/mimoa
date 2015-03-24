/**
 * Created by jesse on 19/02/15.
 */
Accounts.ui.config({
    passwordSignupFields: 'USERNAME_ONLY'
});

Ground.Collection(Meteor.users);
Ground.Collection(Posts);
Ground.Collection(Comments);

nearbyCollection = new Meteor.Collection(null);
