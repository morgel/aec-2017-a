const Web3 = require('web3');
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://testrpc:8545"));

const contractJson = [{
    "constant": true,
    "inputs": [],
    "name": "getOwnerAddress",
    "outputs": [{"name": "", "type": "address"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "amountToWithdraw", "type": "uint256"}],
    "name": "withdrawFunds",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getPaidIn",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [],
    "name": "kill",
    "outputs": [],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getTotalWithdrawnAmount",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getPercentOfAllTokensDistributedToBackers",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "isFunded",
    "outputs": [{"name": "", "type": "bool"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getMyPaidInAmount",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "myTokenShare",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getNumberOfBackers",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getCurrentBalance",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getFundingGoal",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getFundingStatus",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "inputs": [{"name": "goal", "type": "uint256"}, {
        "name": "_percentOfAllTokensDistributedToBackers",
        "type": "uint256"
    }], "payable": false, "type": "constructor"
}, {"payable": true, "type": "fallback"}];

const contract = web3.eth.contract(contractJson);

module.exports.create = function (userAddress, goal, callback) {
    contract.new(
        goal,
        //_percentOfAllTokensDistributedToBackers,
        1,
        {
            from: userAddress,
            data: '0x60606040526000600555341561001157fe5b60405160408061090d833981016040528080519060200190919080519060200190919050505b33600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550816004819055508060078190555060006006819055505b50505b61086c806100a16000396000f300606060405236156100c3576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630c4f65bd1461023a578063155dd5ee1461028c5780632162c96b146102c457806341c0e1b5146102ea57806355f2324d146102fc57806369718e95146103225780637c654303146103485780637f0ab5d1146103725780638aa78543146103985780639535b0cf146103be578063a5749710146103e4578063b85090f31461040a578063f2dfc3fc14610430575b6102385b6000600060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541415156101725734600060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555034600560008282540192505081905550610235565b3360016000600254815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160026000828254019250508190555034600060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550346005600082825401925050819055505b5b565b005b341561024257fe5b61024a610456565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561029457fe5b6102aa6004808035906020019091905050610481565b604051808215151515815260200191505060405180910390f35b34156102cc57fe5b6102d461058c565b6040518082815260200191505060405180910390f35b34156102f257fe5b6102fa610597565b005b341561030457fe5b61030c6106fc565b6040518082815260200191505060405180910390f35b341561032a57fe5b610332610707565b6040518082815260200191505060405180910390f35b341561035057fe5b610358610712565b604051808215151515815260200191505060405180910390f35b341561037a57fe5b610382610722565b6040518082815260200191505060405180910390f35b34156103a057fe5b6103a861076a565b6040518082815260200191505060405180910390f35b34156103c657fe5b6103ce6107e1565b6040518082815260200191505060405180910390f35b34156103ec57fe5b6103f46107ec565b6040518082815260200191505060405180910390f35b341561041257fe5b61041a61080c565b6040518082815260200191505060405180910390f35b341561043857fe5b610440610817565b6040518082815260200191505060405180910390f35b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b90565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610581576104e3610712565b90508015610580573073ffffffffffffffffffffffffffffffffffffffff16318311151561057f57600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051809050600060405180830381858888f19350505050508260066000828254019250508190555060019150610586565b5b5b600091505b50919050565b600060055490505b90565b60006000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156106f757600091505b6002548210156106bc576001600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff166108fc600060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549081150290604051809050600060405180830381858888f19350505050505b81806001019250506105f6565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5050565b600060065490505b90565b600060075490505b90565b6000600454600554101590505b90565b6000600060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b90565b60006000600060009150600060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060006005541115156107c457fe5b60055460075482028115156107d557fe5b0491508192505b505090565b600060025490505b90565b60003073ffffffffffffffffffffffffffffffffffffffff163190505b90565b600060045490505b90565b6000600060045411151561082757fe5b60045460055460640281151561083957fe5b0490505b905600a165627a7a723058204774d27964dd761341ecc6827442ffae8a73072f99b99a4d1efdc6a89d0c02980029',
            gas: '4700000'
        }, callback)
};

module.exports.invest = function(userAddress, contractAddress, amount, callback) {
    web3.eth.sendTransaction({
            from: userAddress,
            to: contractAddress,
            value: amount,
            gas:web3.eth.estimateGas({from: userAddress, to: contractAddress, value: amount})
        },
        callback
    );
};

module.exports.kill = function(userAddress, contractAddress, callback) {
    contract.at(contractAddress).kill.sendTransaction({
            from: userAddress
        },
        callback
    );
};

/*
 function (e, contract) {
 console.log(e, contract);
 if (typeof contract.address !== 'undefined') {
 console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
 }
 }*/