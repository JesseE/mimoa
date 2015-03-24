/**
 * Created by jesse on 20/02/15.
 */
Comments = new Meteor.Collection('comments');

Meteor.methods({
    comments: function(commentAttributes) {
        var user = Meteor.user();
        var post = Posts.findOne(commentAttributes.postId);

        if(!user){
            throw new Meteor.Error(401, "You need to login to leave a comment");
        }
        if(!commentAttributes.body){
            throw new Meteor.Error(422, "Please write some content");
        }
        if(!commentAttributes.postId){
            throw new Meteor.Error(422, "You must comment on a post");
        }
        comment = _.extend(_.pick(commentAttributes, "postId","body"), {
            userId: user._id,
            author: user.username,
            submitted: new Date().getTime()
        });
        return Comments.insert(comment);
    }
});

