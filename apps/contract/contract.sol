// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.11;
pragma experimental ABIEncoderV2;

import "./hip-206/HederaTokenService.sol";
import "./hip-206/HederaResponseCodes.sol";

contract MintAssoTransHTS is HederaTokenService {
    uint256 amountPerEvent;
    address payable subscriber;
    string eventType;
    string[] private pastEvents;

    constructor(uint256 _amount, string memory _eventType) public {
        amountPerEvent = _amount;
        eventType = _eventType;
    }

    function associateSubscriber(address payable _subscriber) external {
        subscriber = _subscriber;
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getPastEvents() public view returns (string memory) {
        bytes memory output;

        for (uint256 i = 0; i < pastEvents.length; i++) {
            output = abi.encodePacked(output, pastEvents[i]);
            output = abi.encodePacked(output, ",");
        }

        return string(output);
    }

    function compareStrings(string memory a, string memory b)
        private
        view
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    function eventTrigger(string memory _event) external {
        pastEvents.push(_event);
        if (compareStrings(_event, eventType)) {
            subscriber.transfer(amountPerEvent);
        }
    }
}
