pragma solidity ^0.4.8;

/*- Receive Ether from anonymous Backers
- Update the funding status of the project
- Show funding status of the project (e.g., show amount of funding that has been received, if the funding goal has been achieved, etc.)
- Allow the Creator of a Project contract to remove the contract and redistribute the funds to the Backers
- allows project owners to withdraw funds when a project has been funded successfully (and not be able to withdraw if the funding goal has not been reached, yet)
- allows backers to retrieve a share (token) for each project they invest in*/

contract Project{

  mapping(address => uint) backers;
  mapping(uint => address) indicesAddresses;
  uint numberOfBackers;
  address owner;
  uint funding_goal;
  uint paid_in = 0;
  uint totalWithdrawnAmount;

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
    totalWithdrawnAmount = 0;
  }

  function() payable public{
    if(backers[msg.sender] != 0){
      backers[msg.sender] += msg.value;
      paid_in += msg.value;
    } else {
      indicesAddresses[numberOfBackers] = msg.sender;
      numberOfBackers += 1;
      backers[msg.sender] += msg.value;
      paid_in += msg.value;
    }
  }

  function myTokenShare() constant returns(uint){
      uint tokenShareInPercent = 0;
      uint paidInAmount = backers[msg.sender];
      assert(paid_in>0);
      tokenShareInPercent = paidInAmount * percentOfAllTokensDistributedToBackers / paid_in ;
      return tokenShareInPercent;
  }

  function isFunded() constant public returns(bool){
   // assert(funding_goal>0);
    return paid_in>=funding_goal;
  }

  function getFundingStatus() constant public returns(uint){
      assert(funding_goal>0);
      return 100*paid_in/funding_goal;
  }

  function withdrawFunds(uint amountToWithdraw) returns(bool){
      if (msg.sender == owner) {
          var alreadyFunded = isFunded();
          if(alreadyFunded){
              if(amountToWithdraw <= (this.balance)){
                  owner.send(amountToWithdraw);
                  totalWithdrawnAmount+=amountToWithdraw;
                  return true;
              }
          }
      }
      return false;
  }

  function kill() {
    if (msg.sender == owner) {
    //redistribute funds
        for(uint i = 0; i < numberOfBackers; i++){
            address backer = indicesAddresses[i];
            backer.send(backers[backer]);
        }
    selfdestruct(owner); //should return 0 value
    }
  }

  function getNumberOfBackers() constant public returns(uint){
      return numberOfBackers;
  }
  
  function getMyPaidInAmount()constant public returns(uint){
      return backers[msg.sender];
  }
  
  function getFundingGoal() constant public returns(uint){
      return funding_goal;
  }
  function getPaidIn() constant public returns(uint){
      return paid_in;
  }
  function getTotalWithdrawnAmount() constant public returns(uint){
      return totalWithdrawnAmount;
  }
  function getPercentOfAllTokensDistributedToBackers() constant public returns(uint){
      return percentOfAllTokensDistributedToBackers;
  }
  function getOwnerAddress() constant public returns(address){
  // keep this function?
    return owner;
  }
  function getCurrentBalance() constant public returns(uint){
    return this.balance;
  }
}
