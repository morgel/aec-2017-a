pragma solidity ^0.4.8;

/*- Receive Ether from anonymous Backers
- Update the funding status of the project
- Show funding status of the project (e.g., show amount of funding that has been received, if the funding goal has been achieved, etc.)
- Allow the Creator of a Project contract to remove the contract and redistribute the funds to the Backers*/

contract Project{

  struct Backing{
    address backer;
    uint value;
  }

  Backing[] backings;

  address owner;
  uint funding_goal;
  uint paid_in;

  function Project(uint goal) public{
    owner = msg.sender;
    funding_goal = goal;
  }

  function() payable public{
    backings.push(Backing(msg.sender, msg.value));
    paid_in += msg.value;
  }

  // returns boolean value funded and percentage of funding
  function isFunded() constant public returns(bool, uint){
    assert(funding_goal>0);
    return (paid_in>=funding_goal, 10);
    // return (paid_in>=funding_goal, paid_in/funding_goal*100);
  }

  function kill() {
    if (msg.sender == owner) {
    //redistribute funds
  for (uint i=0;i<backings.length;i++){
      backings[i].backer.send(backings[i].value);
  }
    selfdestruct(owner); //should return 0 value
  }
  }
}
