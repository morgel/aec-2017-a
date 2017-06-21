pragma solidity ^0.4.0;


contract Project {

    address creator; // creater of the project
    address[] funders;
    mapping (address => uint) fundingmap;
    uint256 fundingstatus;
    
    // times are unix-timestamps
    uint public fundingStart;
    uint public fundingEnd;
    uint128 public fundingGoal;

    /// Create a project with `_fundingStart` and `_fundingEnd`
    function Project(
    uint _fundingStart,
    uint _fundingEnd,
    uint128 _fundingGoal
    ) {
        creator = msg.sender;
        fundingStart = _fundingStart;
        fundingEnd = _fundingEnd;
        fundingGoal = _fundingGoal;
    }

    /// fund the project
    function fund() payable {
        // Revert the call if the funding period is over
        require(now <= fundingEnd);
        fundingmap[msg.sender] = msg.value;
        funders.push(msg.sender);
        fundingstatus += msg.value;
    }
    
    function getfundingstatus() returns(string) {
        bytes32 string_funding_status = bytes32(fundingstatus);
        bytes32 string_fundingGoal = bytes32(fundingGoal);
        
        if(fundingstatus >= fundingGoal){
            // bei der Ausgabe sollte hier noch nen get balance druntergesetzt 
            // werden, da keine string concatination funktioniert
            return("Funding goal has been reached! Current funding status: ");
        }
        
        if(fundingstatus < fundingGoal){
            // bei der Ausgabe sollte hier noch nen get balance druntergesetzt 
            // werden, da keine string concatination funktioniert
            return("Funding goal has not been reached! Current funding status: ");
        }
    }



    function refund() private returns(bool) {
        for (uint i = 0; i < funders.length; i++) {
            address funder = funders[i];
            uint amount = fundingmap[funder];
            
            if(amount > 0){
                fundingmap[funder] = 0;
                if (!funder.send(amount)) {
                    fundingmap[funder] = amount;
                    return false;
                }
            }
        return true;    
        }
    }
    
    function kill(){
    if (msg.sender == creator && refund() == true) 
        selfdestruct(creator);
    }
    
    
    //Fallback Function
    function() payable { }
    
}
