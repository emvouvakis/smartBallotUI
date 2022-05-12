// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract Ballot {
   
    struct Voter {
        bool voted;  // If true, that person already voted
        uint district; // Randomly chosen number between 0 and 9
        uint vote;   // Randomly chosen number between 0 and 4
    }

    struct Proposal {
        string name;
        uint Total_Votes;
        uint Votes_District0;
        uint Votes_District1;
        uint Votes_District2;
        uint Votes_District3;
        uint Votes_District4;
        uint Votes_District5;
        uint Votes_District6;
        uint Votes_District7;
        uint Votes_District8;
        uint Votes_District9;
    }

    mapping(address => Voter) public voters;
    Proposal[] private proposals;

    //Initiates contract
    constructor() {

        //Candidates
        string[5] memory proposalNames = ["a","b","c","d","e"];
        require(proposalNames.length==5,"Candidates must be 5.");

        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name: proposalNames[i],
                Total_Votes: 0,
                Votes_District0: 0,
                Votes_District1: 0,
                Votes_District2: 0,
                Votes_District3: 0,
                Votes_District4: 0,
                Votes_District5: 0,
                Votes_District6: 0,
                Votes_District7: 0,
                Votes_District8: 0,
                Votes_District9: 0
            }));
        }
    }

    //Counters for the number of voters
    int public countV = 0;

    //Counters for the number of voters for each district
    int public d0 = 0;
    int public d1 = 0;
    int public d2 = 0;
    int public d3 = 0;
    int public d4 = 0;
    int public d5 = 0;
    int public d6 = 0;
    int public d7 = 0;
    int public d8 = 0;
    int public d9 = 0;

    //Create random number between 0 and 9 to use as distict number
    function random_district() private view returns(uint){
        return uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty,  
        msg.sender))) % 10;
    }
    
    //Create random number between 0 and 4 to use as vote
    function random_vote() private view returns(uint){
            return uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty,  
            msg.sender))) % 5;
    }

    function vote() public {

        //Restrictions
        require(!voters[msg.sender].voted, "The voter already voted.");
        require(countV<100,"Reached max voters.");

        //Choosing random district
        voters[msg.sender].district=random_district();

        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "Already voted.");
        sender.voted = true;

        //Choosing random vote
        sender.vote = random_vote();

        //Incrementing Counters
        countV += 1;
        proposals[random_vote()].Total_Votes += 1;
        if (sender.district==0){proposals[random_vote()].Votes_District0 += 1;d0+=1;}
        else if (sender.district==1){proposals[random_vote()].Votes_District1 += 1;d1+=1;}
        else if (sender.district==2){proposals[random_vote()].Votes_District2 += 1;d2+=1;}
        else if (sender.district==3){proposals[random_vote()].Votes_District3 += 1;d3+=1;}
        else if (sender.district==4){proposals[random_vote()].Votes_District4 += 1;d4+=1;}
        else if (sender.district==5){proposals[random_vote()].Votes_District5 += 1;d5+=1;}
        else if (sender.district==6){proposals[random_vote()].Votes_District6 += 1;d6+=1;}
        else if (sender.district==7){proposals[random_vote()].Votes_District7 += 1;d7+=1;}
        else if (sender.district==8){proposals[random_vote()].Votes_District8 += 1;d8+=1;}
        else {proposals[random_vote()].Votes_District9 += 1;d9+=1;}
    }

    function res(uint _id) public view returns(Proposal memory){
        return proposals[_id];
    }

}