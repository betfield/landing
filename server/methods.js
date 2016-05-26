Meteor.publish('users', function(filter) {
	var self = this;
    
    var subHandle = Users.find(filter || {}).observeChanges({
        added: function(id, fields) {
            self.added("users", id, fields);
        },
        changed: function(id, fields) {
            self.changed("users", id, fields);
        },
        removed: function(id) {
            self.removed("users", id);
        }
    });
       
    self.ready();
    
    self.onStop(function () {
        subHandle.stop();
    });
});

Meteor.startup(function() {
    console.log("Mongo url: ", process.env.MONGO_URL);
});