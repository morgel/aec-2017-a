const User = require('../models/user');
const Project = require('../models/project');
const Web3 = require('web3');
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://testrpc:8545"));

module.exports = function () {

    // create two initial user
    var usernames = ["creator", "backer"];
    var i = 0;
    usernames.forEach(username => {

        User.getUserByUsername(username, (err, user) => {

            var newUser = new User({
                username: username,
                password: "blockstarter4",
                address: web3.eth.accounts[i]
            });

            if (err) {
                console.log("Error creating initial user " + username);
            } else if (user !== null) {
                user.address = web3.eth.accounts[i];
                user.save();
            } else {
                User.addUser(newUser);
            }
            i++;

        });

    });

    // delete old projects on startup
    Project.clear(function (err) {
        if (err) {
            console.log(err)
        } else {
            console.log("Deleted old projects");
        }
    });

}