const Project = require('../models/project');
const Contract = require('../models/contract');


var sync = function (project) {
    return new Promise(function (resolve, reject) {
        console.log("SYNC PROJECT:" + project.name);

        project.isActive = Contract.isActive(project.address);
        project.isFunded = Contract.isFunded(project.address);
        project.fundingStatus = Number(Contract.getFundingStatus(project.address));

        // get the token data
        var tokenOwner = Contract.getAllTokenOwners(project.address);
        var owners = tokenOwner[0];
        var tokens = tokenOwner[1];

        project.backers = [];
        for (var i = 0; i < owners.length; i++) {
            project.backers.push({
                address: owners[i],
                amount: tokens[i]
            });
        }

        project.save((err, result) => {
            if (err) {
                reject(err);
            }
            resolve(result);
        });
    });
};
module.exports.sync = sync;

module.exports.syncAll = function () {
    Project.getAll((err, projects) => {
        projects.forEach(project => {
            sync(project);
        })
    });

}

