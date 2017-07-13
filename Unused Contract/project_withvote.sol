pragma solidity ^0.4.8;




/// @title Voting
contract Ballot {
    // This declares a new complex type which will
    // be used for variables later.
    // It will represent a single voter.
    struct Voter {
        uint weight; // weight is accumulated by delegation
        bool voted;  // if true, that person already voted
        uint vote;   // index of the voted proposal
    }

    // This is a type for a single proposal.
    struct Proposal {
        bytes32 name;   // short name (up to 32 bytes)
        uint voteCount; // number of accumulated votes
    }
    
    uint ballotendtime;
    uint ballotruntime;
    address public chairperson;

    // This declares a state variable that
    // stores a `Voter` struct for each possible address.
    mapping(address => Voter) public voters;

    // A dynamically-sized array of `Proposal` structs.
    Proposal[] public proposals;
    bytes32[] proposalnames;
    /// Create a new ballot to choose one of `proposalNames`.
    function Ballot(bytes32[] proposalNames, uint ballottime, uint chairweight) {
        chairperson = tx.origin;
        voters[chairperson].weight = chairweight;
        ballotruntime = ballottime;
        ballotendtime = now;
        // For each of the provided proposal names,
        // create a new proposal object and add it
        // to the end of the array.
        for (uint i = 0; i < proposalNames.length; i++) {
            // `Proposal({...})` creates a temporary
            // Proposal object and `proposals.push(...)`
            // appends it to the end of `proposals`.
            proposals.push(Proposal({
                name: proposalNames[i],
                voteCount: 0
            }));
        }
    }

    function getProposalNames() returns(bytes32[]){
        for (uint i = 0; i < proposals.length; i++) {
            proposalnames.push(proposals[i].name);    
        }
        return proposalnames;
    }
    
    function getBallotTime() returns(uint, uint) {
        return (ballotruntime, ballotendtime);
    }

    // Give `voter` the right to vote on this ballot.
    // May only be called by `chairperson`.
    function giveRightToVote(address voter, uint weight) {
        // If the argument of `require` evaluates to `false`,
        // it terminates and reverts all changes to
        // the state and to Ether balances. It is often
        // a good idea to use this if functions are
        // called incorrectly. But watch out, this
        // will currently also consume all provided gas
        // (this is planned to change in the future).
        require((tx.origin == chairperson) && !voters[voter].voted && (voters[voter].weight == 0));
        voters[voter].weight = weight;
    }


    /// Give your vote (including votes delegated to you)
    /// to proposal `proposals[proposal].name`.
    function vote(uint proposal) {
        Voter sender = voters[msg.sender];
        require(!sender.voted);
        sender.voted = true;
        sender.vote = proposal;

        // If `proposal` is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        proposals[proposal].voteCount += sender.weight;
    }

    /// @dev Computes the winning proposal taking all
    /// previous votes into account.
    function winningProposal() constant
            returns (uint winningProposal)
    {
        uint winningVoteCount = 0;
        for (uint p = 0; p < proposals.length; p++) {
            if (proposals[p].voteCount > winningVoteCount) {
                winningVoteCount = proposals[p].voteCount;
                winningProposal = p;
            }
        }
    }

    // Calls winningProposal() function to get the index
    // of the winner contained in the proposals array and then
    // returns the name of the winner
    function winnerName() constant
            returns (bytes32 winnerName)
    {
        winnerName = proposals[winningProposal()].name;
    }
}






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
  //uint nominal_token_value = 1;
  uint emitted_tokens;

  // this counter is for the purpose of triggering an event in the blockchain for testrtc to update the timestamp
  // otherwise now is not updated
  uint eventCounterForTesting = 0;

  function Project(uint goal, uint _percentOfAllTokensDistributedToBackers) public{
    // not all parameters in constructor to initialize additional attributes (category,..., funding_end)
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
    assert(isActive());
    bool exists = false;
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

function getEmittedTokens() constant returns(uint){
      return emitted_tokens;
}

function getMyTokens(address backer) constant returns(uint){
      return tokens_of_backers[backer];
  }

function getAllTokenOwners() constant returns(address[], uint[]) {
    uint len = 0;
    for(uint i = 0; i < numberOfBackers; i++){
        if (tokens_of_backers[indicesAddresses[i]]>0){
            len += 1;
        }
    }
    address[]memory addresses = new address[](len);
    uint[]memory tokens = new uint[](len);
    uint counter = 0;
    for(i = 0; i < numberOfBackers; i++){
        if (tokens_of_backers[indicesAddresses[i]] > 0){
            addresses[counter] = indicesAddresses[i];
            tokens[counter] = tokens_of_backers[indicesAddresses[i]];
            counter += 1;
        }
    }
    return (addresses, tokens);
}

function getAllOfferedTokens() constant returns(address[], uint[], uint[]) {
    uint len = 0;
    for(uint i = 0; i < numberOfBackers; i++){
        if (tokens_offered[indicesAddresses[i]]>0){
            len += 1;
        }
    }
    address[]memory addresses  = new address[](len);
    uint[]memory tokens  = new uint[](len);
    uint[]memory price  = new uint[](len);
    uint counter = 0;
    for(i = 0; i < numberOfBackers; i++){
        if (tokens_offered[indicesAddresses[i]]>0){
            addresses[counter] = indicesAddresses[i];
            tokens[counter] = tokens_offered[indicesAddresses[i]];
            price[counter] = offered_price[indicesAddresses[i]];
            counter += 1;
        }
    }

    return (addresses, tokens, price);

}

function offerMyTokens(uint tokenprice, uint tokennumber) returns(uint, uint){
    assert(isFunded());
        assert(tokennumber <= tokens_of_backers[msg.sender]);
        tokens_offered[msg.sender] = tokennumber;
        offered_price[msg.sender] = tokenprice;
        return (tokens_offered[msg.sender], offered_price[msg.sender]);

}

function getTokensOffered(address backer) constant returns(uint, uint){
    return (tokens_offered[backer], offered_price[backer]);
}


function buyTokens(address tokenowner) payable public{
    assert(isFunded());
        assert(msg.value >= offered_price[tokenowner]);
        bool exists = false;
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
        tokens_of_backers[tokenowner] -= tokens_offered[tokenowner];
        tokens_of_backers[msg.sender] += tokens_offered[tokenowner];
        tokens_offered[tokenowner] = 0;
        offered_price[tokenowner] = 0;
}

  function myTokenShare(address backer) constant returns(uint){
      uint tokenShareInPercent = 0;
      assert(emitted_tokens > 0);
      tokenShareInPercent = tokens_of_backers[backer] * percentOfAllTokensDistributedToBackers / emitted_tokens ;
      return tokenShareInPercent;
  }

  function isFunded() constant public returns(bool){
  if(!isActive()){
    if(paid_in >= funding_goal){
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
      assert(funding_goal > 0);
      return 100*paid_in/funding_goal;
  }

  function withdrawFunds(uint amountToWithdraw) returns(bool){
      if (msg.sender == owner) {
          if(isFunded()){
              if(amountToWithdraw <= (this.balance)){
                  owner.transfer(amountToWithdraw);
                  totalWithdrawnAmount += amountToWithdraw;
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
            tokens_of_backers[backer] = 0;
        }

    selfdestruct(owner); //should return 0 value
    }
  }

  function getNumberOfBackers() constant public returns(uint){
      return numberOfBackers;
  }

  function getMyPaidInAmount(address backer) constant public returns(uint){
      return backers[backer];
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

  // this function is for the purpose of triggering an event in the blockchain for testrtc to update the timestamp
  // otherwise now is not updated
  function incrementEventCounter() {
    eventCounterForTesting += 1;
  }

  
  bytes32[] runningBallotsArray;
  mapping(uint => Ballot) ballotmap;
  uint numberofballots;
  
  function getRunningBallots() constant public returns(bytes32[]){
      return runningBallotsArray;  
  }
  
  
  // Creates a Ballot based on the project this function is called on
  function startBallot(bytes32[] proposalnames, uint ballottime) constant public returns(address){
     require(isFunded() && getTokenShare(msg.sender) > 2);
     ballotmap[numberofballots] = new Ballot(proposalnames, ballottime, getTokenShare(msg.sender));
    
     for(uint i = 0; i < numberOfBackers; i++){
         ballotmap[numberofballots].giveRightToVote(indicesAddresses[i], getTokenShare(indicesAddresses[i]));
     }
     
     numberofballots++;
     return ballotmap[numberofballots];
  }
  
  function endBallot(Ballot ballotAddress) returns(bool, bytes32){
      var (ballotruntime, ballotendtime) = ballotAddress.getBallotTime();
      bytes32 empty;
      if(now >= ballotruntime + ballotendtime){
         bytes32 ballotResult = ballotAddress.winnerName();
         return (true, ballotResult);
      }
      else{
          return (false,  empty);
      }
  }


}
