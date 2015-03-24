Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
        waitOn: function() { return [ Meteor.subscribe('allPosts'), Meteor.subscribe('comments'), Meteor.subscribeWithPagination('mimoacollection', 25)];
    }
});
Router.map(function(){
    this.route('postsList', {
        path:'/',
        template: 'postsList',
        data: function(){
            return proxyDB.mimoaCollection.find({});
        }
    });
    this.route('postPage', {
        path: '/posts/:id',
        data: function() {
            return proxyDB.mimoaCollection.findOne({id : this.params.id});
        }
    });
    this.route('postPageMap', {
        path: '/posts/map/:id',
        data: function(){
            specificData = proxyDB.mimoaCollection.findOne({id : this.params.id});
            return specificData;
        }
    });
    this.route('postEdit', {
        path: '/posts/:_id/edit',
        data: function() {return Posts.findOne(this.params._id); }
    });
    this.route('postSubmit', {
        path: '/submit'
    });
});
var requireLogin = function () {
    if (!Meteor.user()) {
        if (Meteor.loggingIn()) {
            this.render(this.loadingTemplate);
        } else {
            this.render('accessDenied');
        }
    } else {
        this.next();
    }
};
Router.onBeforeAction(function() {
    GoogleMaps.load({v:'3', key:'AIzaSyCHm1lpUrl8t-6qHQ-16X39ZTNt1ocHmkM', libraries: 'geometry'});
    this.next();
}, { only: ['postsList', 'postPageMap'] });

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});