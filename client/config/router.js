
Router.route('/', {
	name: 'landing',
	template: 'landing',
	onStop: function(){
        console.log("You triggered 'onAfterAction' for 'listPage' route.");
    }
});
