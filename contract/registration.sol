// SPDX-License-Identifier: MIT
pragma solidity >=0.8.2 <0.8.7;

contract Registration {
 
    event RegistrationState(Member member);
    
    struct Member { 
        string id;
        string pk_user;
        string piiHash;
        string[4] Ka_user;
        string[4][] Ka;
    }
    
    Member[] member;
    
    function addMember(string memory id, string memory pk_user, string memory piiHash, string[4] memory Ka_user, string[4][] memory Ka) public {
        member.push(Member(
            id,
            pk_user,
            piiHash,
            Ka_user,
            Ka
        ));
    }
    
    function getAllMember () public view returns (Member[] memory)  {
        return member ;
    }
 
}