// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

// @title KPPToken - Campus Currency Token
// @author Twisha Shriyam
// @notice Handles minting and transfer of KPP tokens within campus ecosystem

contract KPPToken {

    string public name = "KPP Token";
    string public symbol = "KPP";
    uint256 public totalSupply;

    mapping(address => uint256) public balanceOf;

    event Transfer(address indexed from, address indexed to, uint256 value);

    // Mint new tokens (for rewards)
    function mint(address to, uint256 amount) public {
        balanceOf[to] += amount;
        totalSupply += amount;

        emit Transfer(address(0), to, amount);
    }

    // Transfer tokens
    function transfer(address to, uint256 amount) public {
        require(balanceOf[msg.sender] >= amount, "Insufficient balance");

        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;

        emit Transfer(msg.sender, to, amount);
    }
}