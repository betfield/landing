Router.configure({
    layoutTemplate: 'landing',
    loadingTemplate: 'splash'
});

Router.route('/', {
	name: 'landing',
	waitOn: function() {
        // Wait until all data is retreived from the DB before rendering the page
        return Meteor.subscribe('users');
    }
});