var _fundingStart = Date.now() / 1000;
var _fundingEnd = 1498000912
var _fundingGoal = 100.0;
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
var project = projectContract.new(
    _fundingStart,
    _fundingEnd,
    _fundingGoal,
    {
        from: web3.eth.accounts[0],
        data: '0x6060604052341561000c57fe5b604051606080610284833981016040528080519060200190919080519060200190919080519060200190919050505b826001819055508160028190555080600360006101000a8154816fffffffffffffffffffffffffffffffff02191690836fffffffffffffffffffffffffffffffff1602179055505b5050505b6101ee806100966000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806302d05d3f1461006757806313e7323e146100b95780637a3a0e84146100df578063b60d428814610129578063bcde18f114610133575bfe5b341561006f57fe5b610077610159565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34156100c157fe5b6100c961017f565b6040518082815260200191505060405180910390f35b34156100e757fe5b6100ef610185565b60405180826fffffffffffffffffffffffffffffffff166fffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b6101316101a7565b005b341561013b57fe5b6101436101bc565b6040518082815260200191505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60025481565b600360009054906101000a90046fffffffffffffffffffffffffffffffff1681565b60025442111515156101b95760006000fd5b5b565b600154815600a165627a7a72305820134477553d72c84598f958fb253b003742493a6a73ca5e91f74533c50db40ddb0029',
        gas: '4700000'
    }, function (e, contract) {
        console.log(e, contract);
        if (typeof contract.address !== 'undefined') {
            console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
        }
    })