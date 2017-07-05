const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
const Project = require('../models/project');

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
    Project.getByBacker(req.user.id, (err, projects) => {
        if (err) {
            res.json({success: false, msg: 'Unable to fetch projects: ' + err});
        } else {
            res.json(projects);
        }
    });
});

/**
 * Get backed projects, which are successfuly funded + funding end date is already reached.
 */
router.get('/profile/funded-projects', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Project.getByBacker(req.user.id, (err, projects) => {
        if (err) {
            res.json({success: false, msg: 'Unable to fetch projects: ' + err});
        } else {

            var projectData = {projects: []};

            //Loop over full list of backed projects
            for (var i = 0; i < projects.length; i++) {

                var project = projects[i];

                //Check blockchain whether the project is successfully funded
                Contract.isFunded(req.user.address, project.address, (isFunded) => {

                    //Add project to return data
                    if (isFunded) {

                        //Check whether user currently has an open offer for the project
                        //and get the amount
                        Contract.getTokensOffered(req.user.address, project.address, (tokenAmount) => {
                            if (tokenAmount > 0) {
                                project.hasOffer = true;
                                project.offeredTokenAmount = tokenAmount;
                            } else {
                                project.hasOffer = false;
                                project.offeredTokenAmount = 0;
                            }
                        });

                        Contract.getTokenShare(req.user.address, project.address, (tokenAmount) => {
                            project.tokenHoldingAmount = tokenAmount;
                        });

                        projectData.projects.push(project);
                    }
                });
            }//End: for

            res.json(projectData);
        }
    });
});

/**
 * Get projects which the user has invested in and which are still in the funding period.
 */
router.get('/profile/invested-projects', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    Project.getByBacker(req.user.id, (err, projects) => {
        if (err) {
            res.json({success: false, msg: 'Unable to fetch projects: ' + err});
        } else {

            var projectData = {projects: []};

            //Loop over full list of backed projects
            for (var i = 0; i < projects.length; i++) {

                var project = projects[i];

                //Check blockchain whether the project is successfully funded
                Contract.isActive(req.user.address, project.address, (isActive) => {
                    if (isActive) {
                        project.isActive = true;
                        projectData.projects.push(project);
                    }
                });

            }//End: for

            res.json(projectData);

        }
    });
});

module.exports = router;
