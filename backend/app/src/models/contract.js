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
    "constant": true,
    "inputs": [{"name": "backer", "type": "address"}],
    "name": "myTokenShare",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getFundingEnd",
    "outputs": [{"name": "", "type": "uint256"}],
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
    "name": "getEmittedTokens",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "backer", "type": "address"}],
    "name": "getMyTokens",
    "outputs": [{"name": "", "type": "uint256"}],
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
    "constant": true,
    "inputs": [],
    "name": "isActive",
    "outputs": [{"name": "", "type": "bool"}],
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
    "constant": false,
    "inputs": [],
    "name": "incrementEventCounter",
    "outputs": [],
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
    "name": "getCreationDate",
    "outputs": [{"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "backer", "type": "address"}],
    "name": "getTokensOffered",
    "outputs": [{"name": "", "type": "uint256"}, {"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "tokenprice", "type": "uint256"}, {"name": "tokennumber", "type": "uint256"}],
    "name": "offerMyTokens",
    "outputs": [{"name": "", "type": "uint256"}, {"name": "", "type": "uint256"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getAllTokenOwners",
    "outputs": [{"name": "", "type": "address[]"}, {"name": "", "type": "uint256[]"}],
    "payable": false,
    "type": "function"
}, {
    "constant": true,
    "inputs": [],
    "name": "getAllOfferedTokens",
    "outputs": [{"name": "", "type": "address[]"}, {"name": "", "type": "uint256[]"}, {
        "name": "",
        "type": "uint256[]"
    }],
    "payable": false,
    "type": "function"
}, {
    "constant": false,
    "inputs": [{"name": "tokenowner", "type": "address"}],
    "name": "buyTokens",
    "outputs": [],
    "payable": true,
    "type": "function"
}, {
    "constant": true,
    "inputs": [{"name": "backer", "type": "address"}],
    "name": "getMyPaidInAmount",
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

module.exports.create = function (userAddress, goal, totalShare, callback) {
    contract.new(
        goal,
        totalShare, {
            from: userAddress,
            data: '606060405260006005556000601455341561001957600080fd5b604051604080611b8d833981016040528080519060200190919080519060200190919050505b33600360006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600481905550806007819055504260098190555062278d0060095401600a819055506000600860006101000a81548160ff02191690831515021790555060006006819055505b50505b611ab4806100d96000396000f3006060604052361561013c576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680630c4f65bd1461030d578063146050ce1461036257806314fd731c146103af578063155dd5ee146103d857806315c6b41f14610413578063175165921461043c5780632162c96b1461048957806322f3e2d4146104b257806341c0e1b5146104df57806355f2324d146104f457806369718e951461051d578063778c3a3c146105465780637c6543031461055b5780639535b0cf14610588578063a5749710146105b1578063b85090f3146105da578063b90c1dbb14610603578063bd85fb6a1461062c578063d90a38fc14610680578063db414e8e146106c7578063e47f111c1461077b578063ec8ac4d814610878578063ed1973aa146108a6578063f2dfc3fc146108f3575b61030b5b60008061014b61091c565b151561015357fe5b60009150600090505b6002548110156101e0573373ffffffffffffffffffffffffffffffffffffffff166001600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156101d257600191505b5b808060010191505061015c565b81151561024d573360016000600254815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060016002600082825401925050819055505b34601060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254019250508190555034601360008282540192505081905550346000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540192505081905550346005600082825401925050819055505b5050565b005b341561031857600080fd5b610320610934565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b341561036d57600080fd5b610399600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190505061095f565b6040518082815260200191505060405180910390f35b34156103ba57600080fd5b6103c26109d1565b6040518082815260200191505060405180910390f35b34156103e357600080fd5b6103f960048080359060200190919050506109dc565b604051808215151515815260200191505060405180910390f35b341561041e57600080fd5b610426610aed565b6040518082815260200191505060405180910390f35b341561044757600080fd5b610473600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610af8565b6040518082815260200191505060405180910390f35b341561049457600080fd5b61049c610b42565b6040518082815260200191505060405180910390f35b34156104bd57600080fd5b6104c561091c565b604051808215151515815260200191505060405180910390f35b34156104ea57600080fd5b6104f2610b4d565b005b34156104ff57600080fd5b610507610cfd565b6040518082815260200191505060405180910390f35b341561052857600080fd5b610530610d08565b6040518082815260200191505060405180910390f35b341561055157600080fd5b610559610d13565b005b341561056657600080fd5b61056e610d27565b604051808215151515815260200191505060405180910390f35b341561059357600080fd5b61059b610d91565b6040518082815260200191505060405180910390f35b34156105bc57600080fd5b6105c4610d9c565b6040518082815260200191505060405180910390f35b34156105e557600080fd5b6105ed610dbc565b6040518082815260200191505060405180910390f35b341561060e57600080fd5b610616610dc7565b6040518082815260200191505060405180910390f35b341561063757600080fd5b610663600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610dd2565b604051808381526020018281526020019250505060405180910390f35b341561068b57600080fd5b6106aa6004808035906020019091908035906020019091905050610e5f565b604051808381526020018281526020019250505060405180910390f35b34156106d257600080fd5b6106da611014565b604051808060200180602001838103835285818151815260200191508051906020019060200280838360005b838110156107225780820151818401525b602081019050610706565b50505050905001838103825284818151815260200191508051906020019060200280838360005b838110156107655780820151818401525b602081019050610749565b5050505090500194505050505060405180910390f35b341561078657600080fd5b61078e6112df565b60405180806020018060200180602001848103845287818151815260200191508051906020019060200280838360005b838110156107da5780820151818401525b6020810190506107be565b50505050905001848103835286818151815260200191508051906020019060200280838360005b8381101561081d5780820151818401525b602081019050610801565b50505050905001848103825285818151815260200191508051906020019060200280838360005b838110156108605780820151818401525b602081019050610844565b50505050905001965050505050505060405180910390f35b6108a4600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050611670565b005b34156108b157600080fd5b6108dd600480803573ffffffffffffffffffffffffffffffffffffffff169060200190919050506119ef565b6040518082815260200191505060405180910390f35b34156108fe57600080fd5b610906611a38565b6040518082815260200191505060405180910390f35b600060019050610931565b60019050610931565b5b90565b6000600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690505b90565b60008060009050600060135411151561097457fe5b601354600754601060008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054028115156109c457fe5b0490508091505b50919050565b6000600a5490505b90565b600080600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610ae257610a3d610d27565b90508015610ae1573073ffffffffffffffffffffffffffffffffffffffff163183111515610ae057600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc849081150290604051600060405180830381858888f193505050501515610ac757600080fd5b8260066000828254019250508190555060019150610ae7565b5b5b600091505b50919050565b600060135490505b90565b6000601060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b919050565b600060055490505b90565b600080600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610cf857600091505b600254821015610cbd576001600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1690508073ffffffffffffffffffffffffffffffffffffffff166108fc601060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549081150290604051600060405180830381858888f193505050501515610c6a57600080fd5b6000601060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8180600101925050610bab565b600360009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b5b5050565b600060065490505b90565b600060075490505b90565b60016014600082825401925050819055505b565b6000610d3161091c565b1515610d8457600454600554101515610d76576001600860006101000a81548160ff021916908315150217905550600860009054906101000a900460ff169050610d8e565b60009050610d8e565b610d8d565b60009050610d8e565b5b90565b600060025490505b90565b60003073ffffffffffffffffffffffffffffffffffffffff163190505b90565b600060045490505b90565b600060095490505b90565b600080601160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054601260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054915091505b915091565b600080610e6a610d27565b1515610e7257fe5b601160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054601060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205403831115610eff57600080fd5b82601160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000208190555083601260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b601160003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054601260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054915091505b9250929050565b61101c611a60565b611024611a74565b60008061102f611a60565b611037611a74565b6000809450600093505b6002548410156110db576000601060006001600088815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205411156110cd576001850194505b5b8380600101945050611041565b846040518059106110e95750595b908082528060200260200182016040525b5092508460405180591061110b5750595b908082528060200260200182016040525b50915060009050600093505b6002548410156112cf576000601060006001600088815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205411156112c1576001600085815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1683828151811015156111ef57fe5b9060200190602002019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050601060006001600087815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205482828151811015156112ac57fe5b90602001906020020181815250506001810190505b5b8380600101945050611128565b8282965096505b50505050509091565b6112e7611a60565b6112ef611a74565b6112f7611a74565b600080611302611a60565b61130a611a74565b611312611a74565b6000809550600094505b6002548510156113b6576000601160006001600089815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205411156113a8576001860195505b5b848060010195505061131c565b856040518059106113c45750595b908082528060200260200182016040525b509350856040518059106113e65750595b908082528060200260200182016040525b509250856040518059106114085750595b908082528060200260200182016040525b50915060009050600094505b60025485101561165b576000601160006001600089815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054111561164d576001600086815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1684828151811015156114ec57fe5b9060200190602002019073ffffffffffffffffffffffffffffffffffffffff16908173ffffffffffffffffffffffffffffffffffffffff1681525050601160006001600088815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205483828151811015156115a957fe5b9060200190602002018181525050601260006001600088815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054828281518110151561163857fe5b90602001906020020181815250506001810190505b5b8480600101955050611425565b8383839850985098505b505050505050909192565b60008061167b610d27565b151561168357fe5b601260008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205434101515156116ce57fe5b60009150600090505b60025481101561175b573373ffffffffffffffffffffffffffffffffffffffff166001600083815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16141561174d57600191505b5b80806001019150506116d7565b8115156117c8573360016000600254815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060016002600082825401925050819055505b8273ffffffffffffffffffffffffffffffffffffffff166108fc601260008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549081150290604051600060405180830381858888f19350505050151561184757600080fd5b601160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054601060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282540392505081905550601160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054601060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055506000601160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506000601260008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b505050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490505b919050565b600080600454111515611a4757fe5b600454600554606402811515611a5957fe5b0490505b90565b602060405190810160405280600081525090565b6020604051908101604052806000815250905600a165627a7a7230582013efb207d5963ce2b255317b5658402e584cd4cadef6a772eb5fa1751472601b0029',
            gas: '4700000'
        }, callback)
};


module.exports.invest = function (userAddress, contractAddress, amount, callback) {
    web3.eth.sendTransaction({
            from: userAddress,
            to: contractAddress,
            value: amount,
            gas: web3.eth.estimateGas({
                from: userAddress,
                to: contractAddress,
                value: amount
            })
        },
        callback
    );
};

module.exports.kill = function (userAddress, contractAddress, callback) {
    contract.at(contractAddress).kill.sendTransaction({
            from: userAddress
        },
        callback
    );
};

module.exports.isFunded = function (contractAddress) {
    return contract.at(contractAddress).isFunded();
};

module.exports.isActive = function (contractAddress) {
    return contract.at(contractAddress).isActive();
};

module.exports.getFundingStatus = function (contractAddress) {
    return contract.at(contractAddress).getFundingStatus();
};

module.exports.getTokenShare = function (userAddress, contractAddress) {
    return contract.at(contractAddress).myTokenShare(userAddress);
};

module.exports.getTokensOffered = function (userAddress, contractAddress) {
    return contract.at(contractAddress).getTokensOffered(userAddress);
};

module.exports.getOwnerAddress = function (contractAddress) {
    return contract.at(contractAddress).getOwnerAddress();
};

module.exports.offerTokens = function (userAddress, contractAddress, amount, price, callback) {
    contract.at(contractAddress).offerMyTokens.sendTransaction(price, amount, {
            from: userAddress
        },
        callback
    );
};

module.exports.getAllOfferedTokens = function (contractAddress) {
    return contract.at(contractAddress).getAllOfferedTokens();
};


module.exports.buyTokens = function (userAddress, contractAddress, tokenOwnerAddress, callback) {
    contract.at(contractAddress).buyTokens.sendTransaction({
            from: userAddress,
            tokenOwnerAddress: tokenOwnerAddress
        },
        callback
    );
};


module.exports.getFundingEnd = function (contractAddress) {
    return contract.at(contractAddress).getFundingEnd.call();
};

