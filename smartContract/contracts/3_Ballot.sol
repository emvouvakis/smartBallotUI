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
        //uint voteCount;
        //uint district; // number of accumulated votes
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

    mapping(address => Voter) public voters;
    // mapping(address => Proposal) public omg;
    // mapping(uint => mapping(address => Proposal)) public xax;


    Proposal[] private proposals;

    
    function random() private view returns(uint){
        return uint(keccak256(abi.encodePacked(block.timestamp,block.difficulty,  
        msg.sender))) % 10;
    }

    string private info;
    function setInfo(string memory _info) public {
        info = _info;
    }

    function getInfo() public view returns (string memory) {
        return info;
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

    // constructor(string[] memory proposalNames) {
    //     require(proposalNames.length<=2,"xaxa");
    //     chairperson = msg.sender;
    //     voters[chairperson].weight = 1;

    //     for (uint i = 0; i < proposalNames.length; i++) {
    //         proposals.push(Proposal({
    //             name: proposalNames[i],
    //             voteCount: 0
    //         }));
    //     }
    // }

    //counting the number of voters
    int private count = 0;
    function incrementCounter() private {
        count += 1;
    }


    // function giveRightToVote(address voter) public {
    //     require(
    //         msg.sender == chairperson,
    //         "Only chairperson can give right to vote."
    //     );
    //     require(
    //         !voters[voter].voted,
    //         "The voter already voted."
    //     );
    //     require(voters[voter].weight == 0);
    //     voters[voter].weight = 1;
    //     require(count<3,"Reached max voters.");
    //     incrementCounter();
    //     voters[voter].district=random();
    // }

    int private count2 = 0;
    function incrementCounter2() private {
        count2 += 1;
    }
    function vote(uint proposal) public {
        //new
        require(
            !voters[msg.sender].voted,
            "The voter already voted."
        );
        require(voters[msg.sender].weight == 0);
        voters[msg.sender].weight = 1;
        require(count<3,"Reached max voters.");
        incrementCounter();
        voters[msg.sender].district=random();
        //end new
        Voter storage sender = voters[msg.sender];
        //Proposal storage prop = omg[msg.sender];
        require(sender.weight != 0, "Has no right to vote");
        require(!sender.voted, "Already voted.");
        sender.voted = true;
        sender.vote = proposal;
        // sender.district=random();
        // xax[sender.district][msg.sender]= Proposal(name,voteCount);

        // If 'proposal' is out of the range of the array,
        // this will throw automatically and revert all
        // changes.
        //proposals[proposal].district=random();
        proposals[proposal].Total_Votes += sender.weight;
        if (sender.district==0){proposals[proposal].Votes_District0 += sender.weight;}
        else if (sender.district==1){proposals[proposal].Votes_District1 += sender.weight;}
        else if (sender.district==2){proposals[proposal].Votes_District2 += sender.weight;}
        else if (sender.district==3){proposals[proposal].Votes_District3 += sender.weight;}
        else if (sender.district==4){proposals[proposal].Votes_District4 += sender.weight;}
        else if (sender.district==5){proposals[proposal].Votes_District5 += sender.weight;}
        else if (sender.district==6){proposals[proposal].Votes_District6 += sender.weight;}
        else if (sender.district==7){proposals[proposal].Votes_District7 += sender.weight;}
        else if (sender.district==8){proposals[proposal].Votes_District8 += sender.weight;}
        else {proposals[proposal].Votes_District9 += sender.weight;}
        //proposals[proposal].voteCount += sender.weight;
        //proposals[proposal].distr= sender.district;
        incrementCounter2();
    }

    function res(uint _id) public view returns(Proposal memory){
        return proposals[_id];
    }
    /** 
     * @dev Computes the winning proposal taking all previous votes into account.
     * @return winningProposal_ index of winning proposal in the proposals array
     */
    // function winningProposal() public view
    //         returns (uint winningProposal_)
    // {
    //     uint winningVoteCount = 0;
    //     //require(proposals.length==count);
    //     //require(count2==count,"oloi");
    //     for (uint p = 0; p < proposals.length; p++) {
    //         if (proposals[p].voteCount > winningVoteCount) {
    //             winningVoteCount = proposals[p].voteCount;
    //             winningProposal_ = p;
    //         }
    //     }
    // }

    /** 
     * @dev Calls winningProposal() function to get the index of the winner contained in the proposals array and then
     * @return winnerName_ the name of the winner
     */
//     function winnerName() public view
//             returns (string memory winnerName_)
//     {
//         require(count2==count+1,"Everyone that has the right must vote.");
//         winnerName_ = proposals[winningProposal()].name;
//     }
}

