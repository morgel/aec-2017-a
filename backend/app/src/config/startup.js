const User = require('../models/user');


module.exports = function () {

    // create two initial user
    var usernames = ["creator", "backer"];
    usernames.forEach(username => {

        User.getUserByUsername(username, (err, user) => {
            if (err) {
                console.log("Error creating initial user " + username);
            } else if (user == null) {
                var user = new User({
                    username: username,
                    password: "blockstarter4",
                    address: "" + Math.random()
                });
                User.addUser(user, (err, user) => {
                    if (err) {
                        console.log("Error creating initial user " + username);
                    } else {
                        console.log("Initial user " + username + " created");
                    }
                });
            }
        });

    });

}