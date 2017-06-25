// import web3 API
const Web3 = require('web3');
// instanciate
const web3 = new Web3();
const BigNumber = require('bignumber.js');
// link with local ethereum node
web3.setProvider(new web3.providers.HttpProvider());

const contractJson = [{
  "constant": false,
  "inputs": [],
  "name": "kill",
  "outputs": [],
  "payable": false,
  "type": "function"
}, {
  "constant": true,
  "inputs": [],
  "name": "isFunded",
  "outputs": [{
    "name": "",
    "type": "bool"
  }, {
    "name": "",
    "type": "uint256"
  }],
  "payable": false,
  "type": "function"
}, {
  "inputs": [{
    "name": "goal",
    "type": "uint256"
  }],
  "payable": false,
  "type": "constructor"
}, {
  "payable": true,
  "type": "fallback"
}];
const untitled_sol_projectContract = web3.eth.contract(contractJson);

function create(goal) {
  return new Promise((resolve, reject) => {
    untitled_sol_projectContract.new(
      goal, {
        from: web3.eth.accounts[0],
        data: '0x6060604052341561000c57fe5b60405160208061040e833981016040528080519060200190919050505b33600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806002819055505b505b61038b806100836000396000f3006060604052361561004a576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806341c0e1b51461010d5780637c6543031461011f575b61010b5b6000805480600101828161006291906102de565b916000526020600020906002020160005b6040604051908101604052803373ffffffffffffffffffffffffffffffffffffffff16815260200134815250909190915060008201518160000160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060208201518160010155505050346003600082825401925050819055505b565b005b341561011557fe5b61011d610150565b005b341561012757fe5b61012f6102a8565b60405180831515151581526020018281526020019250505060405180910390f35b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561026a57600090505b600080549050811015610269576000818154811015156101c957fe5b906000526020600020906002020160005b5060000160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc60008381548110151561022757fe5b906000526020600020906002020160005b50600101549081150290604051809050600060405180830381858888f19350505050505b80806001019150506101ad565b5b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b50565b6000600060006002541115156102ba57fe5b600254600354101560646002546003548115156102d357fe5b0402915091505b9091565b81548183558181151161030b5760020281600202836000526020600020918201910161030a9190610310565b5b505050565b61035c91905b808211156103585760006000820160006101000a81549073ffffffffffffffffffffffffffffffffffffffff0219169055600182016000905550600201610316565b5090565b905600a165627a7a723058200ea06e9a76ecab939d8b6a1309c594da0047d77767c0f012c3d50d3a2de5ac0f0029',
        gas: '4700000'
      },
      function(e, contract) {
        //console.log(e, contract);
        if (typeof contract.address !== 'undefined') {
          resolve(contract.address);
        } else {
          //reject('contract.address is empty');
        }
      });
  });
}

function get(projectAddress) {
  let contract = web3.eth.contract(contractJson).at(projectAddress);
  return contract;
}

function fund(projectAddress, amount) {
    web3.eth.sendTransaction({from: web3.eth.accounts[0], to: projectAddress, value: web3.toWei(amount, 'ether')})
};

module.exports = {
  "create": create,
  "get": get,
  "fund": fund
}
