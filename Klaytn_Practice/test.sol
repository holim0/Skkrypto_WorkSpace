pragma solidity ^0.7.4;

contract KVstore {
    mapping(string => string) store;

    function get(string memory key) public view returns (string memory) {
        return store[key];
    }

    function set(string memory key, string memory value) public {
        store[key] = value;
    }
}
