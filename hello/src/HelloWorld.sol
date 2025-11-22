// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0 ;

contract Hello {
    //states
    address public myAddress;
    address private myAddress1;
    address internal myAddress2;

    //constructor
    constructor(address _myAddress) {
        myAddress = _myAddress;
    }

    //functions
    function getAddress() public returns(address) {
        return myAddress;
    }
}
