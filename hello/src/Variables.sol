// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0 ;

contract Variables {
    //state variables are stored on the blockchain.
    uint256 public i256 = 1e10;
    function performAction() public view {
        //local variables are not saved to the blockchain.
        uint256 i256local = 10;

        //global variables;
        uint256 timestamp = block.timestamp;
    }
}
