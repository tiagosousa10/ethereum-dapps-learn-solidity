contract Immutable {
    address public immutable owner;

    constructor() {
        owner = msg.sender;
    }
}


contract EthersWei {
    uint256 oneWei = 1 wei;
    uint256 oneGwei = 1 gwei; // 10^9 wei
    uint256 oneEther = 1 ether; // 10^18 wei
}

contract ifelse {
    function checkValue(uint256 x) public pure returns (string memory) {
        if(x > 100) {
            return "Greater than 100";
        } else if(x < 50) {
            return "Less than 50";
        } else {
            return "Between 50 and 100";
        }
    }
}


contract loopsExamples {
    function forLoopSum(uint256 n) public pure returns (uint256) {
        uint256 sum = 0;
        for(uint256 i = 1; i<= n; i++) {
            sum += i;
        }
    }

    function whileLoopSum(uint256 n) public pure returns (uint256) {
        uint256 sum = 0;
        uint256 i=1;
        while(i <= n) {
            sum += i;
            i++;
        }

        return sum;
    }
}
