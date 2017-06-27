const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

var schema = new Schema({
    name: String,
    address: String,
    password: String,
    investments: [new Schema({
        project_id: String,
        project_name: String,
        amount: Number
    })]
});

module.exports = mongoose.model("User", schema);
