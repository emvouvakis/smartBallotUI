// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

/** 
 * @title Ballot
 * @dev Implements voting process along with vote delegation
 */
contract Ballot {
   
    struct Voter {
        uint weight; // weight is accumulated by delegation
        bool voted;  // if true, that person already voted
        uint district;
        uint vote;   // index of the voted proposal

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

    address private chairperson;

    mapping(address => Voter) private voters;
    // mapping(address => Proposal) public omg;
    // mapping(uint => mapping(address => Proposal)) public xax;


    Proposal[] private proposals;

    
    function random_district() private view returns(uint){
        return uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty,  
        msg.sender))) % 10;
    }
    
    constructor() {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;
        string[5] memory proposalNames = ["a","b","c","d","e"];
        require(proposalNames.length==5,"Candidates must be 5.");
        for (uint i = 0; i < proposalNames.length; i++) {
            proposals.push(Proposal({
                name: proposalNames[i],
                //voteCount: 0,
                //district: 0,
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

    //counting the number of voters
    int private countV = 0;
    function countVoters() private {
        countV += 1;
    }

    // int private count2 = 0;
    // function incrementCounter2() private {
    //     count2 += 1;
    // }

    function random_vote() private view returns(uint){
            return uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty,  
            msg.sender))) % 5;
        }

    function vote() public {

        require(!voters[msg.sender].voted,
            "The voter already voted.");

        require(voters[msg.sender].weight == 0);
        voters[msg.sender].weight = 1;
        require(countV<=100,"Reached max voters.");

        voters[msg.sender].district=random_district();

        Voter storage sender = voters[msg.sender];
        //Proposal storage prop = omg[msg.sender];
        //require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;

        sender.vote = random_vote();
        countVoters();
        
        proposals[random_vote()].Total_Votes += sender.weight;
        if (sender.district==0){proposals[random_vote()].Votes_District0 += sender.weight;}
        else if (sender.district==1){proposals[random_vote()].Votes_District1 += sender.weight;}
        else if (sender.district==2){proposals[random_vote()].Votes_District2 += sender.weight;}
        else if (sender.district==3){proposals[random_vote()].Votes_District3 += sender.weight;}
        else if (sender.district==4){proposals[random_vote()].Votes_District4 += sender.weight;}
        else if (sender.district==5){proposals[random_vote()].Votes_District5 += sender.weight;}
        else if (sender.district==6){proposals[random_vote()].Votes_District6 += sender.weight;}
        else if (sender.district==7){proposals[random_vote()].Votes_District7 += sender.weight;}
        else if (sender.district==8){proposals[random_vote()].Votes_District8 += sender.weight;}
        else {proposals[random_vote()].Votes_District9 += sender.weight;}
        //proposals[proposal].voteCount += sender.weight;
        //proposals[proposal].distr= sender.district;
    }

    function res(uint _id) public view returns(Proposal memory){
        return proposals[_id];
    }
}

    // function winningProposal() public view
    //         returns (uint winningProposal_)
    // {
    //     uint winningVoteCount = 0;
    //     //require(proposals.length==countV);
    //     //require(count2==countV,"oloi");
    //     for (uint p = 0; p < proposals.length; p++) {
    //         if (proposals[p].voteCount > winningVoteCount) {
    //             winningVoteCount = proposals[p].voteCount;
    //             winningProposal_ = p;
    //         }
    //     }
    // }

//     function winnerName() public view
//             returns (string memory winnerName_)
//     {
//         require(count2==countV+1,"Everyone that has the right must vote.");
//         winnerName_ = proposals[winningProposal()].name;
//     }
// }

