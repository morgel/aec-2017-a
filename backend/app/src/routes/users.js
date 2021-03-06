const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Project = require('../models/project');
const Contract = require('../models/contract');
const sync = require('../config/sync');

// Register
router.post('/', (req, res, next) => {
    let newUser = new User({
        username: req.body.username,
        address: req.body.address,
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Failed to register user: ' + err});
        } else {
            res.status(201);
            res.json(user);
        }
    });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({success: false, msg: 'User not found'});
        }
        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    })
});

/**
 * Get user details.
 */
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.send({user: req.user});
});

/**
 * Get created projects.
 */
router.get('/profile/projects', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Project.getByCreator(req.user.id, (err, projects) => {
        if (err) {
            res.json({success: false, msg: 'Unable to fetch projects: ' + err});
        } else {
            res.json(projects);
        }
    });
});

/**
 * Get backed projects.
 */
router.get('/profile/investments', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Project.getByBacker(req.user.address, (err, projects) => {
        if (err) {
            res.json({success: false, msg: 'Unable to fetch projects: ' + err});
        } else {
            res.json(projects);
        }
    });
});

/**
 * Get backed projects, which are successfuly funded + funding end date is already reached.
 * furthermore if the user has already an open offer for the respective project.
 */
router.get('/profile/funded-projects', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Project.getByBacker(req.user.address, (err, projects) => {
        if (err) {
            res.json({success: false, msg: 'Unable to fetch projects: ' + err});
        } else {

            var projectData = {projects: []};

            //Loop over full list of backed projects
            for (var i = 0; i < projects.length; i++) {
                var project = projects[i].toJSON();
                console.log(Contract.getFundingEnd(project.address));
                console.log((new Date()).getTime());
                //Check blockchain whether the project is successfully funded
                if (Contract.isFunded(project.address)) {

                    // Check whether user currently has an open offer for the project
                    // and get the amount
                    var result = Contract.getTokensOffered(req.user.address, project.address);
                    var tokenAmount = result[0];

                    if (tokenAmount > 0) {
                        project.hasOffer = true;
                        project.offeredTokenAmount = tokenAmount;
                    } else {
                        project.hasOffer = false;
                        project.offeredTokenAmount = 0;
                    }

                    project.tokenHoldingAmount = Contract.getTokenShare(req.user.address, project.address);

                    projectData.projects.push(project);
                }

            }//End: for
            console.log(projectData);
            res.json(projectData);
        }

    });
});

/**
 * Get projects which the user has invested in and which are still in the funding period.
 */
router.get('/profile/invested-projects', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    Project.getByBacker(req.user.address, (err, projects) => {

        if (err) {
            res.json({success: false, msg: 'Unable to fetch projects: ' + err});
            return;
        }

        var projectData = {"projects": []};

        //Loop over full list of backed projects
        for (var i = 0; i < projects.length; i++) {

            var project = projects[i].toJSON();

            //Check blockchain whether the project is still in funding period
            if (Contract.isActive(project.address)) {
                project.isActive = true;
                projectData.projects.push(project);
            }
        }

        res.json(projectData);

    });
});

/**
 * Create a token offer for a given project.
 */
router.post('/offer-tokens', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    Contract.offerTokens(req.user.address, req.body.projectAddress, req.body.amount, req.body.price, (error) => {

        if (error) {
            res.json({success: false, msg: 'Unable create token offer: ' + error});
        } else {
            res.status(201);
            res.json({success: true, msg: 'Token offer successfully created'});
        }
    });
});

router.post('/buy-Tokens', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Contract.buyTokens(req.user.address, req.body.projectAddress, req.body.tokenOwnerAddress, req.body.price, (error) => {
        if (error) {
            res.status(500);
            res.json({success: false, msg: 'Unable to buy token: ' + error});
        } else {

            Project.getByProjectByAddress(req.body.projectAddress, (err, project) => {
                if (err) {
                    res.status(500);
                    res.json({success: false, msg: 'Unable to fetch project: ' + err});
                } else {
                    // set a timeout to wait for mining
                    var syncFunction = function(){
                        sync.sync(project).then(
                            result => res.json({success: true, msg: 'Token successfully bought'}),
                            error => res.json({success: true, msg: 'Token successfully bought, sync failed'})
                        );
                    }
                    setTimeout(syncFunction, 1000);
                }
            });
        }
    });
});


module.exports = router;
