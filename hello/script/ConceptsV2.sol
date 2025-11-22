//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
 interface ICounter {
        function increment() external;
        function decrement() external;
        function getCount() external view returns(bool);
    }

  error InsufficientBalance(address sender, uint256 amount, uint256 balance);

contract conceptsV2 {
    //payable function
    function deposit() public payable{
        //msg.value is the amount sent with the transaction => wei
    }

    //three ways to send ether

    function sendEthers(address payable recipient) public {
        recipient.transfer(1 ether);
        //gas: 2300;
        bool sent = recipient.send(1 ether);
        //recommended
        (bool success,) = recipient.call{value: 1 ether}("");
    }

    fallback() external payable {
        //code executed if no other function is called
    }

    receive() external payable {
        //executed when ether is sent without a function call
    }

    function callOtherContract(address counterContractAddress) public {
        ICounter counter = ICounter(counterContractAddress);
        try counter.increment(){
            //success
        } catch {
            //error
        }

        uint count = counter.getCount();
    }

    using SafeMath for uint;

    function calculate(uint a, uint b) public pure returns(uint ) {
        return a.add(b);
    }

    function generateHash(string memory _text, uint _num) public pure returns (bytes32 ) {
        return keccak256(abi.encodePacked(_text, _num));
    }

    function processTransaction(uint amount) public {
        require(amount > 0, "Amount must be greater than 0");
        assert(amount != type(uint).max); // assert will throw if the condition is not met

        if(amount > address(this).balance) {
            revert InsufficientBalance(msg.sender, amount, address(this).balance);
        }


    }
}



library SafeMath {
    function add(uint a, uint b) internal pure returns(uint) {
        uint c= a + b;
        return c;
    }
}
