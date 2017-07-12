const express = require('express');
const router = express.Router();
const passport = require('passport');
const sync = require('../config/sync');

const Project = require('../models/project');
const Contract = require('../models/contract');
const User = require('../models/user');


// get all Projects
router.get('/', (req, res, next) => {

    Project.getAll((err, projects) => {
        if (err) {
            res.json({success: false, msg: 'Unable to fetch projects'});
        } else {
            res.json(projects);
        }
    });

});

// Create a project (user needs to be logged in)
router.post('/', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    Contract.create(req.user.address, req.body.fundingGoal, req.body.totalShare, (err, contract) => {
        if (err) {
            res.json({success: false, msg: 'Failed to create contract: ' + err});
        }
        else {
            if (typeof contract.address !== 'undefined') {
                var project = new Project({
                    name: req.body.name,
                    description: req.body.description,
                    fundingGoal: req.body.fundingGoal,
                    creator: req.user.id,
                    address: contract.address,
                    fundingEnd: req.body.fundingEnd,
                    totalShare: req.body.totalShare,
                    isActive: true,
                    isFunded: false
                });

                Project.add(project, (err, project) => {
                    if (err) {
                        // TODO: retry updating the database to get it in sync with blockchain
                        res.json({success: false, msg: 'Failed to create project: ' + err});
                    } else {
                        res.status(201);
                        res.json(project);
                    }
                });
            }
        }
    });
});

// Invest in a projects (user needs to be logged in)
router.post('/:project/invest', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    var projectId = req.params.project;

    Project.getById(projectId, (err, project) => {
        if (err || project === null) {
            res.status(500);
            res.json({success: false, msg: 'Failed to load project: ' + err});
        }

        if (req.body.amount > 0) {

            Contract.invest(req.user.address, project.address, req.body.amount, (err, result) => {
                if (err) {
                    res.status(500);
                    res.json({success: false, msg: 'Problem with transaction: ' + err});
                } else {
                    Project.invest(project, req.user, req.body.amount, (err, project) => {
                        if (err) {
                            // TODO: retry updating the database to get it in sync with blockchain
                        } else {
                            // sync with blockchain to get current fundingStatus, isActive and isFunded
                            sync.sync(project).then(
                                result => res.json({success: true, msg: 'Investment successful'}),
                                error => res.json({success: true, msg: 'Investment successful, sync failed'})
                            )
                        }
                    });
                }
            });
        } else {
            res.status(500);
            res.json({success: false, msg: 'Invalid investement-amount'});
        }
    });
});

// Delete a project (user needs to be logged in)
router.delete('/:project', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    var projectId = req.params.project;

    Project.getById(projectId, (err, project) => {
        if (err || project === null) {
            res.status(500);
            res.json({success: false, msg: 'Failed to load project: ' + err});
        }


        if (project.creator.toString() !== req.user.id.toString()) {
            res.status(401);
            res.json({success: false, msg: "Unauthorized"});
        }
        else {
            Contract.kill(req.user.address, project.address, (err, result) => {
                if (err) {
                    res.status(500);
                    res.json({success: false, msg: 'Problem with kill: ' + err});
                }
                else {
                    // TODO: possibly handle error with database to keep in sync with blockchain
                    project.remove();
                    res.json({success: true, msg: 'Successfully killed'});
                }
            });
        }
    });
});


/**
 * Get all token offer for all projects listed in the DB.
 */
router.get('/token-offers', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    var data = {projects: []};
    var projectOffers = [];

    //This function is necessary to deal with asynchronicity and will be called later
    var _createOfferJson = function (index, resolve, reject) {

        var ownerAddress = projectOffers[index.i][0][index.j];
        var amount = projectOffers[index.i][1][index.j];
        var price = projectOffers[index.i][2][index.j];

        //Read user and push offer as json into respective array of current project
        User.getUserByAddress(ownerAddress, (errUser, user) => {

            if (errUser || user === null) {
                console.log("Error");
                return;
            }

            console.log("***User: " + user);
            console.log("Amount/price" + amount + " / " + price);

            var offer = {
                owner: user,
                amount: amount,
                price: price
            };

            console.log("**off:" + JSON.stringify(offer));
            console.log("*** i:" + index.i + ", j:" + index.j);

            data.projects[index.i].offers.push(offer);
            console.log("**data:" + JSON.stringify(data));

            resolve();
        });

    };

    var promises = [];

    Project.getAll((err, projects) => {

        if (err) {
            res.json({success: false, msg: 'Unable to fetch projects'});
            return;
        }

        //Loop over all projects, to check blockchain for existing offers
        for (var i = 0; i < projects.length; i++) {

            var project = projects[i].toJSON();
            project.offers = [];

            //Push project json incl. all offers to the return json object
            data.projects.push(project);

            //projectOffers[i][j][0] => ownerAddress, projectOffers[i][j][1] => tokenAmount, projectOffers[i][j] => price
            projectOffers[i] = Contract.getAllOfferedTokens(project.address);

            //Loop over token offers of current project
            for (var j = 0; j < projectOffers[i][0].length; j++) {
                promises.push(new Promise(function (resolve, reject) {
                    _createOfferJson({i: i, j: j}, resolve, reject);
                }));
            }
        }

        Promise.all(promises).then(() => {
            res.json(data);
        });

    });
});

// get active projects
router.get('/active', (req, res, next) => {

    Project.getActive((err, projects) => {
        if (err) {
            res.json({success: false, msg: 'Unable to fetch projects'});
        } else {
            res.json(projects);
        }
    });

});

// get funded projects
router.get('/funded', (req, res, next) => {

    Project.getFunded((err, projects) => {
        if (err) {
            res.json({success: false, msg: 'Unable to fetch projects'});
        } else {
            res.json(projects);
        }
    });

});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.send({user: req.user});
});

module.exports = router;
