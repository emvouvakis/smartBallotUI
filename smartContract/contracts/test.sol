// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Test {

  uint public amount;

  constructor() {
    amount = 1;
  }

  function addToAmount() public {
    amount++;
  }
  
}
