// SPDX-License-Identifier:  MIT
pragma solidity ^0.8.0;

contract AccessControl {
    address public owner ;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    function add(uint a, uint b) public view onlyOwner returns(uint) {
        return a + b;
    }
}
