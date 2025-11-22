// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;
import {Counter} from "../src/Counter.sol";
import {Script} from "forge-std/Script.sol";

contract DeployCounter is Script {
    function run() public {
        vm.startBroadcast(); // start broadcasting transactions
        Counter counter = new Counter();
        vm.stopBroadcast();
    }
}
