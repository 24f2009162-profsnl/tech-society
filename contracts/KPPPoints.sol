// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// @title KPPPoints - Reward System Contract
// @notice Tracks points and converts them into tokens using inter-contract calls

interface IKPPToken {
    function mint(address to, uint256 amount) external;
}

contract KPPPoints {

    mapping(address => uint256) public points;
    address public tokenAddress;

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
    }

    // Add points to user
    function addPoints(address user, uint256 amount) public {
        points[user] += amount;
    }

    // Convert points into tokens
    function convertToToken(uint256 amount) public {
        require(points[msg.sender] >= amount, "Not enough points");

        points[msg.sender] -= amount;

        // Inter-contract call
        IKPPToken(tokenAddress).mint(msg.sender, amount);
    }
}