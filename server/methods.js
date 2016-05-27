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
    process.env.MAIL_URL = "smtp://admin@fctwister.ee:esoteric@mail.fctwister.ee:25";
    console.log("MAIL url: ", process.env.MAIL_URL);
});

Meteor.methods({
    sendEmail: function (to, from, subject, text) {
        check([to, from, subject, text], [String]);

        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        this.unblock();

        Email.send({
            to: to,
            from: from,
            subject: subject,
            text: text
        });
    }
});
