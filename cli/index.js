var Web3 = require('web3');

var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider());


var projectContract = web3.eth.contract([{
    "constant": true,
    "inputs": [],
    "name": "creator",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "fundingEnd",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "fundingGoal",
    "outputs": [{"name": "", "type": "uint128"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "fund",
    "outputs": [],
    "payable": true,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "fundingStart",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "inputs": [{"name": "_fundingStart", "type": "uint256"}, {
        "name": "_fundingEnd",
        "type": "uint256"
    }, {"name": "_fundingGoal", "type": "uint128"}], "payable": false, "type": "constructor"
}]);

web3.eth.defaultAccount = web3.eth.accounts[0];

var contract = projectContract.at("0x8c336bacb1814ef4945992f97bceb7b9465b93a4");

// TODO
var amount = web3.toWei(0.01, "ether")
contract.fund({value: 0.01})


// check balance of an account
//var balance = web3.eth.getBalance(contract);
//console.log(balance);



