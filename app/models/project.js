// import web3 API
const Web3 = require('web3');
// instanciate
const web3 = new Web3();
const BigNumber = require('bignumber.js');
// link with local ethereum node
web3.setProvider(new web3.providers.HttpProvider());

const contractJson = [
  {"constant":false,"inputs":[{"name":"amountToWithdraw","type":"uint256"}],"name":"withdrawFunds","outputs":[],"payable":false,"type":"function"},
  {"constant":false,"inputs":[],"name":"kill","outputs":[],"payable":false,"type":"function"},
  {"constant":true,"inputs":[],"name":"isFunded","outputs":[{"name":"","type":"bool"},{"name":"","type":"uint256"}],"payable":false,"type":"function"},
  {"constant":true,"inputs":[],"name":"myTokenShare","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},
  {"inputs":[{"name":"goal","type":"uint256"},{"name":"_percentOfAllTokensDistributedToBackers","type":"uint256"}],"payable":false,"type":"constructor"},
  {"payable":true,"type":"fallback"}];



const untitled_sol_projectContract = web3.eth.contract(contractJson);

function create(goal, _percentOfAllTokensDistributedToBackers) {
  return new Promise((resolve, reject) => {
    untitled_sol_projectContract.new(
      goal,
      _percentOfAllTokensDistributedToBackers,
       {
        from: web3.eth.accounts[0], 
        data: '0x6060604052341561000c57fe5b604051604080610567833981016040528080519060200190919080519060200190919050505b33600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600481905550806007819055505b50505b6104d3806100946000396000f30060606040523615610060576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063155dd5ee1461012b57806341c0e1b51461014b5780637c6543031461015d5780638aa785431461018e575b6101295b3360016000600254815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160026000828254019250508190555034600060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550346005600082825401925050819055505b565b005b341561013357fe5b61014960048080359060200190919050506101b4565b005b341561015357fe5b61015b61029c565b005b341561016557fe5b61016d610408565b60405180831515151581526020018281526020019250505060405180910390f35b341561019657fe5b61019e61043e565b6040518082815260200191505060405180910390f35b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561029657610216610408565b9150915081801561022d5750600654600554038311155b1561029557600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051809050600060405180830381858888f19350505050151561029457fe5b5b5b5b505050565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16141561040357600091505b6002548210156103c8576001600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff166108fc600060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549081150290604051809050600060405180830381858888f1935050505015156103ba57fe5b5b81806001019250506102fb565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5050565b60006000600060045411151561041a57fe5b6004546005541015606460045460055481151561043357fe5b0402915091505b9091565b60006000600060009150600060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490506007546005548281151561049a57fe5b040291508192505b5050905600a165627a7a7230582065d11009d51c2e8265c5e3d920a2730b2ae3fc737a8659593f1d945b4b42b9770029', 
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
    console.log("Balance Project  after :"+web3.eth.getBalance(projectAddress))
  return contract;
}



function fund(projectAddress, amount) {
    console.log("Amount: "+amount);

    console.log("Estimated: "+web3.eth.estimateGas({from: web3.eth.accounts[0], to: projectAddress, value: amount}));
    console.log("Balance Account0 before:"+web3.eth.getBalance(web3.eth.accounts[0]))
    console.log("Balance Project  before:"+web3.eth.getBalance(projectAddress))
    
    web3.eth.sendTransaction({from: web3.eth.accounts[1],
        to: projectAddress,
        value: amount,
        gas:web3.eth.estimateGas({from: web3.eth.accounts[1], to: projectAddress, value: amount})});
    console.log("Balance Account0 after :"+web3.eth.getBalance(web3.eth.accounts[0]))
    console.log("Balance Project  after :"+web3.eth.getBalance(projectAddress))
};

module.exports = {
  "create": create,
  "get": get,
  "fund": fund
}
