/**
 * Created by jesse on 19/02/15.
 */
//Accounts.ui.config({
//    passwordSignupFields: 'USERNAME_ONLY'
//});

Ground.Collection(Meteor.users);
Ground.Collection(Posts);
Ground.Collection(Comments);



//var options = {
//    keepHistory: 1000 * 60 * 5,
//    localSearch: true
//};
//
//var fields = ['title'];
//
//ProjectSearch = new SearchSource('mimoacollection', fields, options);