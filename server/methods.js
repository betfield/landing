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
    console.log("MAIL url: ", process.env.MAIL_URL);
});

Meteor.methods({
    sendEmail: function (to, from, subject, text) {
        check([to, from, subject, text], [String]);
        var mailSent;
        // Let other method calls from the same client start running,
        // without waiting for the email sending to complete.
        
        try {
            this.unblock();
                Email.send({
                    to: to,
                    from: from,
                    subject: subject,
                    text: text
                });
                
            console.log("Sending mail..");
            console.log("To: ", to);
            console.log("From: ", from);
            console.log("Subject: ", subject);
            console.log("Text: ", text);
        } catch (err) {
            throw new Meteor.Error(123, 'Error 123: Sending of email failed');
        }
    }
});
