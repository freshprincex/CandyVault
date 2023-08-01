// SPDX-License-Identifier: MIT

pragma solidity ^0.8.17;

contract CandyVault{
    address payable public owner;
    mapping (address => uint256) candyVaultBalance;
    uint256 public candyPrice;

    constructor(){
        owner = payable(msg.sender);
        candyVaultBalance[address(this)] = 250;
        candyPrice = 0.01 ether;
    }

    function getCandyVaultBalance() public view returns(uint256){
        return candyVaultBalance[address(this)];
    }

    function refillCandyVault(uint256 _amount)public onlyOwner{
        candyVaultBalance[address(this)] += _amount;
    }

    function setCandyPrice(uint _price) public onlyOwner{
        candyPrice = _price;
    }

    function getCandyPrice() public view returns(uint256){
        return candyPrice;
    }

    function buyCandy(uint256 _amount) public payable{
        uint256 totalPrice = _amount * candyPrice;
        require(msg.value >= totalPrice, "Not enough ether to purchase candy");
        require(candyVaultBalance[address(this)] >= _amount, "Not enough candy to purchase, contact vendor");
        candyVaultBalance[address(this)] -= _amount;
        candyVaultBalance[msg.sender] += _amount;
    }

    function getCustomerBalance()public view returns (uint256){
        return candyVaultBalance[msg.sender];
    }

    modifier onlyOwner(){
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }
}