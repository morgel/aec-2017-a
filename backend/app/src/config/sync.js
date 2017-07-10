const Project = require('../models/project');
const Contract = require('../models/contract');


var sync = function (project) {
    return new Promise(function (resolve, reject) {
        console.log("SYNC PROJECT:" + project.name);
        project.isActive = Contract.isActive(project.address);
        project.isFunded = Contract.isFunded(project.address);
        project.fundingStatus = Number(Contract.getFundingStatus(project.address));
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

