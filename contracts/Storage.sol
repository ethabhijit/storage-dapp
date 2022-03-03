//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

contract Storage {
    uint storedData;

    function set(uint x) public {
        storedData = x;
    }

    function get() public view returns (uint) {
        return storedData;
    }
}
