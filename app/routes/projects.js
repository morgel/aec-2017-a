const express = require('express');
const router = express.Router();
const Project = require('../models/project');

router.post('/create', (req, res, next) => {
    Project.create(req.body.goal,req.body._percentOfAllTokensDistributedToBackers).then(address => {
        console.log("Contract address: " + address);
        let result = Project.get(address);
        console.log(`Current funding status: ${result.isFunded()[1].toNumber()}`);
        res.json({
            success: true,
            contractAddress: address,
            currentFundingStatus: result.isFunded()[1].toNumber()
        });
    }).catch(err => {
        console.error(err);
        res.json({ success: false, msg: 'Failed to create project' });
    });
});

router.post('/fund', (req, res, next) => {
    let funding = Project.fund(req.body.projectAddress, req.body.amount);
    let result = Project.get(req.body.projectAddress);
        console.log(`Current funding status: ${result.isFunded()[1].toNumber()}`);
        
        res.json({
            success: true,
            contractAddress: req.body.projectAddress,
            currentFundingStatus: result.isFunded()[1].toNumber(),
            mytokenshare: result.myTokenShare().toNumber()
        });
});

router.post('/fundingstatus', (req, res, next) => {
    let result = Project.get(req.body.projectAddress);
        console.log(`Current funding status: ${result.isFunded()[1].toNumber()}`);
        console.log(`myTokenShare: ${result.myTokenShare()}`);
        console.log(result.paid_in);
        res.json({
            success: true,
            contractAddress: req.body.projectAddress,
            currentFundingStatus: result.isFunded()[1].toNumber(),
            Amount_paidIn: result.paid_in,
            mytokenshare: result.myTokenShare().toNumber()
        });
});


module.exports = router;