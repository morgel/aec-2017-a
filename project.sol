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
  uint nominal_token_value;
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

function fundwithtoken() payable public{
     if(backers[msg.sender] != 0){
      backers[msg.sender] += msg.value;
      tokens_of_backers[msg.sender] += msg.value/nominal_token_value;
      emitted_tokens += msg.value/nominal_token_value;
      paid_in += msg.value;
    } else {
      indicesAddresses[numberOfBackers] = msg.sender;
      numberOfBackers += 1;
      tokens_of_backers[msg.sender] += msg.value/nominal_token_value;
      emitted_tokens += msg.value/nominal_token_value;
      backers[msg.sender] += msg.value;
      paid_in += msg.value;
    }
}

function getmyTokens() constant returns(uint){
      return tokens_of_backers[msg.sender];
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


function buyTokens(address tokenowner,uint tokennumber) payable public{
    if (tokens_offered[tokenowner]>=tokennumber){
        tokenowner.transfer(tokennumber*offered_price[tokenowner]);tokenowner]-=tokennumber;
        tokens_offered[tokenowner]-=tokennumber;
        tokens_of_backers[tokenowner]-=tokennumber;
        tokens_of_backers[msg.sender]+=tokennumber;
    }
    else
    {throw;}
}

    

  function() payable public{
  assert(!isFunded());
  else{
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
  }

  function myTokenShare() constant returns(uint){
      uint tokenShareInPercent = 0;
      uint backerPaidInAmount = backers[msg.sender];
      assert(paid_in>0);
      tokenShareInPercent = backerPaidInAmount * percentOfAllTokensDistributedToBackers / paid_in ;
      return tokenShareInPercent;
  }

  function isFunded() constant public returns(bool){
  if(now > fundingEnd){
    if(paid_in>=funding_goal){
      successfullyFunded = true;
      return successfullyFunded;
    }
    else{
    kill();
    return false;
    }
  }
  else{
    return false;
  }
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

  struct Offer {
    address seller;
    uint price;
    uint created;
    uint offerDeadline;
    uint numberOfUnits;
    address buyer;
    uint id;
  }

  uint counterOffers = 0;
  mapping(uint => Offer) idOffer;
  Offer[] currentOffers;
  Offer[] archivedOffers;

  function createOffer(uint numberOfUnitsToTrade, uint specifiedPrice){
    assert(thisSellerhasOnlyOneCurrentOffer());
    assert(backers[msg.sender] >= numberOfUnitsToTrade);

    Offer newOffer;
    newOffer.seller = msg.sender;
    newOffer.price = specifiedPrice;
    newOffer.created = now;
    newOffer.offerDeadline = created + 5 * 1 days;
    newOffer.numberOfUnits = numberOfUnitsToTrade;
    newOffer.buyer = 0;
    newOffer.id = counterOffers;

    idOffer[counterOffers] = newOffer;
    currentOffers.push(newOffer);

    counterOffers += 1;

  }

  function thisSellerhasOnlyOneCurrentOffer() constant private returns(bool){
    hasOnlyOneOffer = true;
    for(uint i = 0; i < currentOffers.length; i++){
        if(msg.sender == currentOffers[i].seller){
          hasOnlyOneOffer = false;
          return hasOnlyOneOffer;
        }
    }
    return hasOnlyOneOffer;
  }

  function buyShares(uint offerId){
    // like this the offer's Id is the parameter to identify the offer
    // other parameters would be possible, e.g. seller address
    Offer offerToBuy;
    for(uint i = 0; i < currentOffers.length; i++){
        if(offerId == currentOffers[i].id){
          offerToBuy = currentOffers[i];
        }
    }
    assert(offerToBuy != 0);
    assert(offerToBuy.buyer == 0);
    assert(msg.value >= offerToBuy.price);

    offerToBuy.buyer = msg.sender;
    (offerToBuy.seller).transfer(msg.value);

    backers[offerToBuy.seller] -= offerToBuy.numberOfUnits;
    if(backers[msg.sender] != 0){
      backers[msg.sender] += offerToBuy.numberOfUnits;
    } else {
      indicesAddresses[numberOfBackers] = msg.sender;
      numberOfBackers += 1;
      backers[msg.sender] += offerToBuy.numberOfUnits;
    }

    removeOfferfromCurrentOffers(offerToBuy);
    archivedOffers.push(offerToBuy);
  }

  function removeOfferfromCurrentOffers(Offer offerToDelete){
    uint idToFind = offerToDelete.id;
    uint indexOfOffer = -1;
    for(uint i = 0; i < currentOffers.length; i++){
        if(idToFind == currentOffers[i].id){
          indexOfOffer = i;
        }
    }
    assert(indexOfOffer != -1);

    //swap with last, so gaps are prevented
    currentOffers[indexOfOffer] = currentOffers[currentOffers.length-1];
    delete currentOffers[currentOffers.length-1];
  }
}
