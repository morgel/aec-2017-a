var program = require('commander');
var Project = require('./Project.js');
var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider());

program
    .version('0.0.1');

program
    .command('create [name] [creator]')
    .description('Create a new project [name] [creator]')
    .action(function (name, creator) {
        createProject(name, creator);
    });

program
    .command('status [address]')
    .description('Get funding status of project [address]')
    .action(function (address) {
        getStatus(address);
    });

program
    .command('fund [projectAddress] [accountIndex] [amount]')
    .description('Fund a project [projectAddress] [accountIndex] [amount]')
    .action(function (projectAddress, accountIndex, amount) {
        fund(projectAddress, accountIndex, amount);
    });

program
    .command('kill [projectAddress] [accountIndex]')
    .description('Kill a project [projectAddress] [accountIndex]')
    .action(function (projectAddress, accountIndex) {
        kill(projectAddress, accountIndex);
    });

program
    .command('balance [accountIndex]')
    .description('Show the balance of an external account [accountIndex]')
    .action(function (accountIndex) {
        accountBalance(accountIndex);
    });


program
    .parse(process.argv);

async function createProject(name, creator) {
    let project = await Project.create(name, creator, Date.now() / 1000, Date.now() / 1000, 100);
    console.log("Project '" + name + "' created with address " + project.address);
}

function getStatus(address) {
    let project = new Project(address);
    console.log(project.status()[0]);
    console.log("Current Funding Amount: " + web3.fromWei(project.status()[1], 'ether') + ' Ether');

}

function fund(projectAddress, accountIndex, amount) {
    let project = new Project(projectAddress);
    project.fund(accountIndex, amount);
    console.log("New Funding Amount: " + web3.fromWei(project.status()[1], 'ether'));
}

function kill(projectAddress, accountIndex) {
    let project = new Project(projectAddress);
    project.kill(accountIndex);
    console.log("Project killed and funds successfully redistributed!");
}

function accountBalance(accountIndex) {
    let address = web3.eth.accounts[accountIndex];
    let balance = web3.eth.getBalance(address);
    let amount = web3.fromWei(balance, 'ether');
    console.log('Account[' + accountIndex + '] balance:' + amount + ' Ether.');
}