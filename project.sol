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

  bool private successfullyFunded;

// Note that time is in seconds
// i.e. 30 days funding period equals 30days*24hours*60minutes*60seconds = 2592000
  uint creationDate;
  uint fundingEnd;

  string category;
  string title;
  string description;
  uint project_start;
  uint project_end;

//nominal value of a token in wei
  mapping(address => uint) tokens_of_backers;
  mapping(address => uint) tokens_offered;
  mapping(address => uint) offered_price;
  uint nominal_token_value = 1;
  uint emitted_tokens;

  function Project(uint goal, uint _percentOfAllTokensDistributedToBackers) public{
    // not yet added all parameters in constructor to initialize additional attributes (category,..., funding_end)
    owner = msg.sender;
    funding_goal = goal;
    percentOfAllTokensDistributedToBackers = _percentOfAllTokensDistributedToBackers;
    creationDate = now;
    // 30 days funding period
    fundingEnd = creationDate + 30* 1 days;
    // for tests use 30 seconds:
    //fundingEnd = creationDate + 30* 1 seconds;
    successfullyFunded = false;
    totalWithdrawnAmount = 0;
  }

  function() payable public{
    assert(!isFunded());
    bool exists =false;
        for(uint i = 0; i < numberOfBackers; i++){
            if (indicesAddresses[i]== msg.sender)
            {
                exists = true;
            }
        }
        if (!exists){
            indicesAddresses[numberOfBackers] = msg.sender;
            numberOfBackers += 1;
        }
    
      tokens_of_backers[msg.sender] += msg.value;
      emitted_tokens += msg.value;
      backers[msg.sender] += msg.value;
      paid_in += msg.value;
}

function getmyTokens() constant returns(uint){
      return tokens_of_backers[msg.sender];
  }
  
function getallTokenOwners() constant returns(address[], uint[]) {
    address[]memory addresses  = new address[](numberOfBackers);
    uint[]memory tokens  = new uint[](numberOfBackers);
    for(uint i = 0; i < numberOfBackers; i++){
            addresses[i] = indicesAddresses[i];
            tokens[i] = tokens_of_backers[indicesAddresses[i]];
    }
    return (addresses,tokens);
}


function getallOfferedTokens() constant returns(address[], uint[],uint[]) {
    address[]memory addresses  = new address[](numberOfBackers);
    uint[]memory tokens  = new uint[](numberOfBackers);
    uint[]memory price  = new uint[](numberOfBackers);
    for(uint i = 0; i < numberOfBackers; i++){
            addresses[i] = indicesAddresses[i];
            tokens[i] = tokens_offered[indicesAddresses[i]];
            price[i] = offered_price[indicesAddresses[i]];
    }
    return (addresses,tokens,price);
}

function getemittedtokens() constant returns(uint){
      return emitted_tokens;
  }

    
    
function offermyTokens(uint tokenprice,uint tokennumber) returns(uint, uint){
    
        if(tokennumber > tokens_of_backers[msg.sender]-tokens_offered[msg.sender])
        {throw;}
        else{
        tokens_offered[msg.sender]=tokennumber;
        offered_price[msg.sender]=tokenprice;
        }
        return (tokens_offered[msg.sender], offered_price[msg.sender]);
    
}

function gettokensoffered() constant returns(uint, uint){
    return (tokens_offered[msg.sender], offered_price[msg.sender]);
}


function buyTokens(address tokenowner) payable public{
    
        assert(msg.value>=offered_price[tokenowner]);
        bool exists =false;
        for(uint i = 0; i < numberOfBackers; i++){
            if (indicesAddresses[i]== msg.sender)
            {
                exists = true;
            }
        }
        if (!exists){
            indicesAddresses[numberOfBackers] = msg.sender;
            numberOfBackers += 1;
        }
        tokenowner.transfer(offered_price[tokenowner]);
        tokens_of_backers[tokenowner]-=tokens_offered[tokenowner];
        tokens_of_backers[msg.sender]+=tokens_offered[tokenowner];
        tokens_offered[tokenowner]=0;
        offered_price[tokenowner]=0;
}

    


  function myTokenShare() constant returns(uint){
      uint tokenShareInPercent = 0;
      uint tokensOfBacker = tokens_of_backers[msg.sender];
      assert(paid_in>0);
      tokenShareInPercent = tokensOfBacker * percentOfAllTokensDistributedToBackers / paid_in ;
      return tokenShareInPercent;
  }
  

  function isFunded() constant public returns(bool){
  if(!isActive()){
    if(paid_in>=funding_goal){
      successfullyFunded = true;
      return successfullyFunded;
    }
    else{
    return false;
    }
  }
  else{
    return false;
  }
  }
  
  function isActive() constant public returns(bool){
      if(now > fundingEnd){
          return false;
      }
      else {return true;}
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
                  owner.transfer(amountToWithdraw);
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
            backer.transfer(tokens_of_backers[backer]);
            tokens_of_backers[backer]=0;
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
    return owner;
  }
  function getCurrentBalance() constant public returns(uint){
    return this.balance;
  }
  function getCreationDate() constant public returns(uint){
    return creationDate;
  }
  function getFundingEnd() constant public returns(uint){
    return fundingEnd;
  }
}
