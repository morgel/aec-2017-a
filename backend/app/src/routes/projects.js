const express = require('express');
const router = express.Router();
const passport = require('passport');

const Project = require('../models/project');
const Contract = require('../models/contract');

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

    Contract.create(req.user.address, req.body.fundingGoal, (err, contract)=> {
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
                    totalShare: req.body.totalShare
                });

                Project.add(project, (err, project) => {
                    if (err) {
                        // TODO: Rollback on blockchain
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
                            res.json({success: true, msg: 'Investment successful'});
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

// Invest in a projects (user needs to be logged in)
router.delete('/:project', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    var projectId = req.params.project;

    Project.getById(projectId, (err, project) => {
        if (err || project === null) {
            res.status(500);
            res.json({success: false, msg: 'Failed to load project: ' + err});
        }

        console.log(project.creator);
        console.log(req.user.id);

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


// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.send({user: req.user});
});

module.exports = router;
