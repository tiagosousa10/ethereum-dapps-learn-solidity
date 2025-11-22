// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract Counter {
    uint256 count;

    function get() public returns(uint256) {
        return count;
    }

    function inc() public {
        count +=1;
    }

    function dec() public {
        count -=1;
    }
}
