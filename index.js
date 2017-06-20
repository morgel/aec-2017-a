'use strict';

const program = require('commander');
const projectContract = require('./project.js');

program.version('1.0.0')
  .option('-c, --create [value]', 'Create new project with project funding goal.')
  .option('-s, --send <items>', 'Send money to project: first param is the project contract address, second param is the amount to send.')
  .option('-f, --funding [value]', 'Show funding status for project with this address.')
  .parse(process.argv);

const funding_goal = program['create'] || 0;
const send_money = program['send'] || [0, 0];
const funding_status_address = program['funding'] || false;

//console.log("funding_goal", funding_goal);
//console.log("send_money", send_money);
//console.log("funding_status_address", funding_status_address);

if (funding_goal > 0) {
  projectContract.create(funding_goal).then(address => {
    console.log("Contract address: " + address);
    let result = projectContract.get(address);
    console.log(`Current funding status: ${result.isFunded()[1].toNumber()}`);
  }).catch(err => {
    console.error(err);
  });
}

if (funding_status_address) {
  let result = projectContract.get(funding_status_address);
  console.log(`Is project funded? Result: ${result.isFunded()[0]}. Funding: ${result.isFunded()[1].toNumber()}%`);
}
