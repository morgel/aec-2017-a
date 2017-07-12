const mongoose = require('mongoose');
const Contract = require('../models/contract');

// Project Schema
const ProjectSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    fundingGoal: {
        type: Number,
        required: true
    },
    fundingStatus: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    isFunded: {
        type: Boolean,
        required: true
    },
    fundingEnd: {
        type: Date,
        required: false
    },
    address: {
        type: String,
        unique: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    totalShare: {
        type: Number,
        required: false,
    },
    backers: [new mongoose.Schema({
        user: String,
        amount: Number
    })]
});

const Model = module.exports = mongoose.model('Project', ProjectSchema);

module.exports.getById = function (id, callback) {
    Model.findById(id, callback);
}

module.exports.getAll = function (callback) {
    Model.find(callback);
}

module.exports.getActive = function (callback) {
    Model.find({isActive: true}, callback);
}

module.exports.getByProjectByAddress = function (addressparam, callback) {
    Model.find({address: addressparam}, callback);
}

module.exports.getFunded = function (callback) {
    Model.find({isFunded: true}, callback);
}

module.exports.getByCreator = function (creatorId, callback) {
    Model.find({creator: creatorId}, callback);
}

module.exports.getByBacker = function (backerId, callback) {
    Model.find({'backers.user': backerId}, callback);
}

module.exports.invest = function (project, user, amount, callback) {

    project.backers.push({
        user: user.id,
        amount: amount
    });

    project.save(callback);

}

module.exports.add = function (project, callback) {
    project.fundingStatus = 0;
    project.save(callback);
}


// deletes all projects
module.exports.clear = function (callback) {
    Model.collection.drop(callback)
}
