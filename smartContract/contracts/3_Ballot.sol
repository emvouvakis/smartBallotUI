// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;


contract Ballot {
   
    struct Voter {
        bool voted;  // if true, that person already voted
        uint district; // randomly chosen number between 0 and 9
        uint vote;   // randomly chosen number between 0 and 4
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

    
    function random_district() private view returns(uint){
        return uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty,  
        msg.sender))) % 10;
    }
    
    constructor() {
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

    //counting the number of voters
    int public countV = 0;
    function countVoters() private {
        countV += 1;
    }

    function random_vote() private view returns(uint){
            return uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty,  
            msg.sender))) % 5;
    }

    function vote() public {

        require(!voters[msg.sender].voted, "The voter already voted.");

        require(countV<100,"Reached max voters.");

        voters[msg.sender].district=random_district();

        Voter storage sender = voters[msg.sender];
        require(!sender.voted, "Already voted.");
        sender.voted = true;

        sender.vote = random_vote();
        countVoters();
        
        proposals[random_vote()].Total_Votes += 1;
        if (sender.district==0){proposals[random_vote()].Votes_District0 += 1;}
        else if (sender.district==1){proposals[random_vote()].Votes_District1 += 1;}
        else if (sender.district==2){proposals[random_vote()].Votes_District2 += 1;}
        else if (sender.district==3){proposals[random_vote()].Votes_District3 += 1;}
        else if (sender.district==4){proposals[random_vote()].Votes_District4 += 1;}
        else if (sender.district==5){proposals[random_vote()].Votes_District5 += 1;}
        else if (sender.district==6){proposals[random_vote()].Votes_District6 += 1;}
        else if (sender.district==7){proposals[random_vote()].Votes_District7 += 1;}
        else if (sender.district==8){proposals[random_vote()].Votes_District8 += 1;}
        else {proposals[random_vote()].Votes_District9 += 1;}
    }

    function res(uint _id) public view returns(Proposal memory){
        return proposals[_id];
    }

}
//     function winningProposal() public view
//             returns (uint winningProposal_, uint[] memory winners)
//     {
//         //uint[] winners;
//         uint winningVoteCount = 0;
//         //require(proposals.length==countV);
//         //require(count2==countV,"oloi");
//         for (uint p = 0; p < proposals.length; p++) {
//             if (proposals[p].Total_Votes > winningVoteCount) {
//                 winningVoteCount = proposals[p].Total_Votes;
//                 winningProposal_ = p;
                
//             }
//         }
//         for (uint p = 0; p < proposals.length; p++) {
//             if (proposals[p].Total_Votes == winningVoteCount) {
//                 winners.push(proposals[p]);
//             }
//         }

//     }

//     function winnerName() public view
//             returns (string memory winnerName_)
//     {
//         // require(count2==countV+1,"Everyone that has the right must vote.");
//         winnerName_ = proposals[winningProposal()].name;
//     }
// }

