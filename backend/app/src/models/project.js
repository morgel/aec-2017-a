const mongoose = require('mongoose');

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
    address: {
        type: String,
        required: true,
        unique: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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

module.exports.getByCreator = function (creatorId, callback) {
    Model.find({creator: creatorId}, callback);
}

module.exports.getByBacker = function (backerId, callback) {
    Model.find({'backers.user': backerId}, callback);
}


module.exports.invest = function (project, user, amount, callback) {

    // TODO: invest in blockchain

    project.backers.push({
        user: user.id,
        amount: amount
    })

    project.fundingStatus = project.fundingStatus + amount;

    project.save(callback);

}


module.exports.add = function (project, callback) {

    // TODO: add to blockchain
    project.address = "" + Math.random();
    project.fundingStatus = 0;

    project.save(callback);
}