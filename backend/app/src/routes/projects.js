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

    console.log(JSON.stringify(req.user));

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
                    address: contract.address
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
            res.status(500)
            res.json({success: false, msg: 'Failed to load project: ' + err});
        }

        if (req.body.amount > 0) {

            Project.invest(project, req.user, req.body.amount, (err, project) => {
                if (err) {
                    res.status(500)
                    res.json({success: false, msg: 'Investment failed: ' + err});
                } else {
                    res.json({success: true, msg: 'Investment successful'});
                }
            });

        } else {
            res.status(500)
            res.json({success: false, msg: 'Invalid investement-amount'});
        }

    });

});


// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.send({user: req.user});
});

module.exports = router;
