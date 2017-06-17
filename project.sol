pragma solidity ^0.4.8;

/*- Receive Ether from anonymous Backers
- Update the funding status of the project
- Show funding status of the project (e.g., show amount of funding that has been received, if the funding goal has been achieved, etc.)
- Allow the Creator of a Project contract to remove the contract and redistribute the funds to the Backers
- allows project owners to withdraw funds when a project has been funded successfully (and not be able to withdraw if the funding goal has not been reached, yet)
- allows backers to retrieve a share (token) for each project they invest in*/

contract Project{

  //struct Backing{
    //address backer;
    //uint value;
  //}

  //Backing[] backings;
  mapping(address => uint) backers;
  mapping(uint => address) indicesAddresses;
  uint numberOfBackers;

  address owner;
  uint funding_goal;
  uint paid_in;
  uint totalWithdrawnAmount;

  //ufixed0x8 percentOfAllTokensDistributedToBackers;
  // i.e. no fractions of percents (like 12.5%) only full numbers (12%)
  uint percentOfAllTokensDistributedToBackers;

  string category;
  string title;
  string description;
  uint project_start;
  uint project_end;
  uint funding_start;
  uint funding_end;


  function Project(uint goal, uint _percentOfAllTokensDistributedToBackers) public{
    // not yet added all parameters in constructor to initialize additional attributes (category,..., funding_end)
    owner = msg.sender;
    funding_goal = goal;
    percentOfAllTokensDistributedToBackers = _percentOfAllTokensDistributedToBackers;
  }

  function() payable public{
    indicesAddresses[numberOfBackers] = msg.sender;
    numberOfBackers += 1;
    backers[msg.sender] += msg.value;
    //backings.push(Backing(msg.sender, msg.value));
    paid_in += msg.value;
  }

  function myTokenShare() constant returns(uint){
      uint tokenShareInPercent = 0;
      uint paidInAmount = backers[msg.sender];
      // which amount determines share of Tokens?
      //funding_goal (i.e. backers receive tokens only until this goal is reached)
      // or paid_in (i.e. every backer receives tokens but shares are diluted)
      tokenShareInPercent = paidInAmount / paid_in * percentOfAllTokensDistributedToBackers;
      return tokenShareInPercent;

  }

  // returns boolean value funded and percentage of funding
  function isFunded() constant public returns(bool, uint){
    assert(funding_goal>0);
    return (paid_in>=funding_goal, paid_in/funding_goal*100);
  }

  function withdrawFunds(uint amountToWithdraw){
      if (msg.sender == owner) {
          var (alreadyFunded, fundingStatus) = isFunded();
          if(alreadyFunded && amountToWithdraw <= paid_in-totalWithdrawnAmount){
              owner.transfer(amountToWithdraw);
          }
      }
  }

  function kill() {
    if (msg.sender == owner) {
    //redistribute funds
    for(uint i = 0; i < numberOfBackers; i++){
        address backer = indicesAddresses[i];
        backer.transfer(backers[backer]);
    }
  //for (uint i=0;i<backings.length;i++){
    //  backings[i].backer.send(backings[i].value);
  //}
    selfdestruct(owner); //should return 0 value
  }
  }
}
