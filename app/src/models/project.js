const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

var schema = new Schema({
    address: String,
    name: String,
    description: String,
    funding_goal: Number,
    funding_end: Date,
    funding_status: Number,
    backer_count: Number
});

module.exports = mongoose.model("Project", schema);
